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
    const {status, confirmRoundStart, endRound} = useGame();
    const [gamestart, setgamestart] = useState(false);
    const [displayTitle, setdisplayTitle] = useState("Gartic");
    const [displayText, setdisplayText] = useState("made by Alex and Leyun");
    const [isdrawing, setisdrawing] = useState(false);
    const [isdrawer, setisdrawer] = useState(false);
    const [canGuess, setcanGuess] = useState(false);
    const [roundTime, setroundTime] = useState(100);
    const [messages, setmessages] = useState([{sender:{name: "alex"}, body:"apple", correct:false},{sender:{name: "alex"}, body:"apple", correct:false}, {sender:{name: "alex", _id:""}, body:"alex guessed!", correct:true}]);
    const [drawing, setdrawing] = useState(false);
    const [word, setword] = useState("none");
    const beforeRoundStart=(data)=>{
      // setisdrawing(data.isdraw);
      if(data.isround0){
        setdisplayTitle("Game is about to start!");
        setdisplayText(`You are ${(data.isdraw)?"drawing":"guessing"}`)
      }else{
        setdisplayTitle(`The answer of last round is ${data.answer}!`);
        setdisplayText(`You are ${(data.isdraw)?"drawing":"guessing"} in next round.`)
      }
      if(data.isdraw){
        setisdrawer(true);
        let timer = setTimeout(() => {
          confirmRoundStart();
        }, 6000);
        return () => {
          clearTimeout(timer);
        };
        
      }else{
        setisdrawer(false);
      }
    }


    useEffect(() => {
      if(status.type == "START"){ //{type:"START"}
        setroundTime(0);
        beforeRoundStart(status.data);
        console.log(status.data);
        setgamestart(true);
        setcanGuess(false);
        setdrawing(false);
      }
      if(status.type == "ROUNDSTART"){ 
        // setroundStart(performance.now());
        console.log("round start")
        if(isdrawer){
          setisdrawing(true);
          setdrawing(true);
        // confirmRoundStart();
        return () => {
        }
      }else{
          setcanGuess(true);
          setdrawing(true);
        }
        setroundTime(100);
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
    

    useEffect(() => {
      console.log(roundTime);
      if(roundTime>0){
        let timer = setTimeout(() => {
          console.log("t")
          setroundTime(roundTime-1)
        }, 250);
        return(()=>clearTimeout(timer))
      }else if(isdrawer){
        setisdrawing(false);
        endRound()
      }
      

    }, [roundTime])

    return(

        <div className="PlayScreen">
        <div className="UserList-view"><UserList users={users}/></div>
        <div className="CanvasAndChat-view">
          {(isdrawing)? <Canvas />: <div className="Display">{(!drawing)? 
          <>
          <span className="displayTitle">{displayTitle}</span>
          <p className="displayText">{displayText}</p>
          </>: <></>
          }
          </div>}
          <Waiting num={usernum} visible={!gamestart} />
          <div className = "Chat">
            <div className="chatleft">
            <div className="Chat-messages">{messages.map(n=>(
              (n.correct)? <>
                {/* <CheckCircleTwoTone twoToneColor="#52c41a" /> */}
                <p className="correctFont">{(n.sender._id==me._id)?'You guessed!':n.body}</p>
              </>
              :<p className="guessFont">{n.sender.name}: {n.body}</p>
        ))}</div>
            <Input.Search id="searchBar" placeholder="guess here..." enterButton="send" disabled={!canGuess}></Input.Search>
            </div>
            <div className="chatright">{(drawing)? ((isdrawer)? <><p>You word is:</p><p className="word">{word}</p></>: <Progress type="circle" percent={roundTime} showInfo={false} className="progress" />):<></>}</div>
          </div>
        </div>
      </div>
    )
}

export default Room;