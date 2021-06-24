const mongoose = require('mongoose');
const http = require('http');
const WebSocket = require('ws');
const express = require('express');
const path = require('path');
const uuid = require('uuid');

const mongo = require('./mongo');
const { finished } = require('stream');

const app = express();

//get MONGO_URL
require('dotenv-defaults').config();
/* -------------------------------------------------------------------------- */
/*                               MONGOOSE MODELS                              */
/* -------------------------------------------------------------------------- */
const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String, require: true},
  color: {type: String},
  score: {type: Number},
});
const messageSchema = new Schema({
  sender: {type: mongoose.Types.ObjectId, ref: 'User'},
  body: {type: String, require: true},
})
const problemSchema = new Schema({
  answer: {type: String, require: true},
})
const roomSchema = new Schema({
  users: [{ type: mongoose.Types.ObjectId, ref: 'User'}],
  messages: [{type: mongoose.Types.ObjectId, ref: 'Message'}],
  problems : [{type: mongoose.Types.ObjectId, ref: 'Problem'}],
  round: {type: Number},
})

const UserModel = mongoose.model('User', userSchema);
const MessageModel = mongoose.model('Message', messageSchema);
const ProblemModel = mongoose.model('Problem', problemSchema);
const RoomModel = mongoose.model('Room', roomSchema);

/* -------------------------------------------------------------------------- */
/*                                  UTILITIES                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                            SERVER INITIALIZATION                           */
/* -------------------------------------------------------------------------- */
const server = http.createServer(app);

const wss = new WebSocket.Server({
  server,
});

app.use(express.static(path.join(__dirname, 'public')));

let Rooms = {};
const clientRooms = {};
let Answers = {};
let RoomCount = 0
let Messages = {}
let Rounds = {}
const validateRoom = async ()=>{
  if(!Rooms[RoomCount] || !Rooms[RoomCount].users){
    Rooms[RoomCount] = new RoomModel();
    Rooms[RoomCount].save()
  }else if(Rooms[RoomCount].users.length >= 10){
    RoomCount++;
    Rooms[RoomCount] = new RoomModel();
    Rooms[RoomCount].save()
  }
  return RoomCount;
}

wss.on('connection', function connection(client) {
  client.id = uuid.v4();
  client.roomNumber = undefined
  client.sendEvent = (e)=> client.send(JSON.stringify(e))
  client.on('message', async function incoming(message) {
    message = JSON.parse(message);
    const {type} = message
    switch(type){
      case 'JOIN':{
        const {
          data:{name, color},
        } = message;
        
        client.name = name
        const newUser = new UserModel({name: name, color: color, score: 0});
        newUser.save();
        client.userid = newUser._id;
        console.log(client.userid)
        const roomNumber = await validateRoom();
        client.roomNumber = roomNumber
        if(!clientRooms[client.roomNumber]){
          clientRooms[client.roomNumber] = new Set()
        }
        clientRooms[client.roomNumber].forEach((client)=>{
          client.sendEvent({
            type: 'JOIN',
            data:{
              userList: newUser
            }
          })
        })
        if(!Rooms[client.roomNumber].users){
          Rooms[client.roomNumber].users = []
        }
        client.sendEvent({
          type: 'JOINALL',
          data:{
            userList: Rooms[client.roomNumber].users
          }
        })
        Rooms[client.roomNumber].users.push(newUser);
        clientRooms[client.roomNumber].add(client);
        if(clientRooms[client.roomNumber].size === 3){
          Rounds[client.roomNumber] = 0;
          clientRooms[client.roomNumber].forEach((client)=>{
            client.sendEvent({
              type:'START',
              data:{}
            })
          })
          console.log('start')
        }

        break;
      }
      case "ADDPROBLEM":{
        console.log(message);
        const {data:{answer}} = message;
        const newP = await ProblemModel.findOne({answer})
        console.log(newP);
        if(newP){client.sendEvent({type: 'ADDPROBLEM',data:{answer:""}})
        }else {
          console.log("new problem");
          const newProblem = new ProblemModel({answer: answer});
          newProblem.save();
          client.sendEvent({type: 'ADDPROBLEM',data:{answer: answer}})
        }
        break;
      }
      case "GETPROBLEM":{
        console.log(message);
        if(Answers[client.roomNumber]){
          client.sendEvent({type: 'GETPROBLEM',data:{answers: Answers[client.roomNumber]}})
          break;
        }
        const problem = await ProblemModel.find({});
        const answers = problem.map(n=>n.answer);
        let arr = [];
        let len = answers.length;
        let anss = []
        for(var i=0;i<10;i++){
          let tmp = Math.random()*len
          while(arr.includes(tmp)){
            tmp = Math.random()*len;
          }
          arr.push(tmp);
        }
        for(var i=0;i<10;i++){
          anss.push(answers[arr[i]])
        }
        Answers[client.roomNumber] = anss;
        client.sendEvent({type: 'GETPROBLEM',data:{answers: anss}})
        break;
      }
      case "GUESS":{
        const {data:{sender, body}} = message;
        if(body === Answer[client.roomNumber][Rounds[client.roomNumber]]){
          clientRooms[client.roomNumber].forEach((client)=>{
            client.sendEvent({
              type: 'MESSAGE',
              data:{
                body: `${sender} guessed!`
              }
            })
          })
        }else{
          clientRooms[client.roomNumber].forEach((client)=>{
            client.sendEvent({
              type: 'MESSAGE',
              data:{
                sender,
                body
              }
            })
          })
        }
        break;
      }
      case "DRAW":{
        break;
      }
    }
    // disconnected
    client.once('close', () => {
      if(client.roomNumber !== undefined){
        clientRooms[client.roomNumber].delete(client);
      Rooms[client.roomNumber].users = Rooms[client.roomNumber].users.filter((user)=> {
        return user._id !== client.userid
      })
      let id = client.userid
      clientRooms[client.roomNumber].forEach((client)=>{
        client.sendEvent({
          type: 'LEAVE',
          data:{
            id: id
          }
        })
      })
    }});
  });
});

mongo.connect();

server.listen(8080, () => {
  console.log('Server listening at http://localhost:8080');
});
