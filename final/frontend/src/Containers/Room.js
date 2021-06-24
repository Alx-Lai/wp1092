import '../App.css';
import Canvas from '../Components/Canvas';
import { useState, useEffect } from "react";
import UserList from '../Components/UserList';
import {Input, Progress} from "antd";
import useGame from "../Hooks/useGame";
import Waiting from './Waiting';
import {CheckCircleTwoTone} from '@ant-design/icons';
const Room = ({me, info, displayStatus})=>{ 
    const [users, setusers] = useState([me]); 
    const [usernum, setusernum] = useState(1);
    const {status, confirmRoundStart} = useGame();
    const [gamestart, setgamestart] = useState(false);
    const [displayText, setdisplayText] = useState("gartic");
    const [isdrawing, setisdrawing] = useState(false);
    const [canGuess, setcanGuess] = useState(false);
    const [roundTime, setroundTime] = useState(100);
    const [round, setround] = useState(0);
    const [roundStart, setroundStart] = useState(0);
    const [messages, setmessages] = useState([{sender:{name: "alex"}, body:"apple", correct:false},{sender:{name: "alex"}, body:"apple", correct:false}, {sender:{name: "alex", _id:""}, body:"alex guessed!", correct:true}]);
    
    const beforeRoundStart=(data)=>{
      console.log("hello");
      // setisdrawing(data.isdraw);
      if(data.isdraw==true){
        let timer = setTimeout(() => {
          console.log("confirm!");
          confirmRoundStart();
        }, 5000);
        // confirmRoundStart();
        return () => {
          clearTimeout(timer);
        };
        
      }
    }
    
    useEffect(() => {
      if(status.type == "START"){ //{type:"START"}
        beforeRoundStart(status.data);
        console.log(status.data);
        setgamestart(true);
      }
      if(status.type == "ROUNDSTART"){ 
        // setroundStart(performance.now());
        console.log("round start")
      }
      if(status.type == "MYID"){
        me._id = status.data.id;
      }
      if(status.type == "JOIN"){ 
        setusers([...users, {name: status.data.userList.name, me: false, score: status.data.userList.score, color: status.data.userList.color, _id: status.data.userList._id}])
      }
      if(status.type == "LEAVE"){ 
        setusers(users.filter(n=>n._id !== status.data.id))
      }
      if(status.type == "DRAW"){
        //TODO
      }
    }, [status])

    useEffect(() => {
      console.log(info)
      setusers([me,...info.map(n=>{
        let a = n;
        a.me = false;
        return a;
      })])
    }, [info])

    useEffect(() => setusernum(users.length), [users])
    
    return(

        <div className="PlayScreen">
        <div className="UserList-view"><UserList users={users}/></div>
        <div className="CanvasAndChat-view">
          {(isdrawing)? <Canvas />: <div className="Canvas"><Progress percent={roundTime} showInfo={false} trailColor="#589439" className="progress" /></div>}
          <Waiting num={usernum} visible={!gamestart} />
          <div className = "Chat">
            <div className="Chat-messages">{messages.map(n=>(
              (n.correct)? <>
                {/* <CheckCircleTwoTone twoToneColor="#52c41a" /> */}
                <p className="correctFont">{(n.sender._id==me._id)?'You guessed!':n.body}</p>
              </>
              :<p className="guessFont">{n.sender.name}: {n.body}</p>
        ))}</div>
            <Input.Search id="searchBar" placeholder="guess here..." enterButton="send" disabled={!canGuess}></Input.Search>
          </div>
        </div>
      </div>
    )
}

export default Room;