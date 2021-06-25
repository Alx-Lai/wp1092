import '../App.css';
import Canvas from '../Components/Canvas';
import { useState, useEffect, useRef } from "react";
import UserList from '../Components/UserList';
import {Input, Progress} from "antd";
import useGame from "../Hooks/useGame";
import Waiting from './Waiting';
import {CheckCircleTwoTone} from '@ant-design/icons';
import CanvasView from '../Components/CanvasView';
const Room = ({me, info, displayStatus})=>{ 
    const [users, setusers] = useState([me]); 
    const [usernum, setusernum] = useState(1);
    const {status, confirmRoundStart, guessWord} = useGame();
    const [gamestart, setgamestart] = useState(false);
    const [displayTitle, setdisplayTitle] = useState("Gartic");
    const [displayText, setdisplayText] = useState("made by Alex and Leyun");
    const [isdrawing, setisdrawing] = useState(false);
    const [isdrawer, setisdrawer] = useState(false);
    const [canGuess, setcanGuess] = useState(false);
    const [roundTime, setroundTime] = useState(100);
    const [messages, setmessages] = useState([]);
    const [drawing, setdrawing] = useState(false);
    const [word, setword] = useState("none");
    const [guessinput, setguessinput] = useState("");
    const [progcolor, setprogcolor] = useState("#5dcc26");
    const messagesEndRef = useRef(null);
    const [stroke, setstroke] = useState({});

    const scrollToBottom = async () => {
      await messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  };

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
        beforeRoundStart(status.data);
        setgamestart(true);
        setcanGuess(false);
        setdrawing(false);
      }
      if(status.type == "ROUNDSTART"){ 
        // setroundStart(performance.now());
        if(isdrawer){
          setword(status.data.answer);
          setisdrawing(true);
          setdrawing(true);
        // confirmRoundStart();
        return () => {
        }
      }else{
          setcanGuess(true);
          setdrawing(true);
        }
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
        setstroke(status.data);
      }
      if(status.type == "TIME"){
        setroundTime(status.data.time);
        if (status.data.time==0&&isdrawer) {setisdrawing(false)}
      }
    if(status.type == "MESSAGE"){
        setusers(users.map((n=>{
          let a = n;
          if(a._id==status.data.sender) a.score+=status.data.score;
          return a;
        })))
        let m = status.data;
        let sender = users.find(n=>n._id==m.sender);
        m.sender=sender;
        setmessages([...messages, m])
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
      scrollToBottom();
    }, [messages])
    return(

        <div className="PlayScreen">
        <div className="UserList-view"><UserList users={users}/></div>
        <div className="CanvasAndChat-view">
          {(isdrawing)? <Canvas />: (!drawing)?<div className="Display"> 
          <>
          <span className="displayTitle">{displayTitle}</span>
          <p className="displayText">{displayText}</p>
          </>
          </div>:<CanvasView  data={stroke}/>}
          <Waiting num={usernum} visible={!gamestart} />
          <div className = "Chat">
            <div className="chatleft">
            <div className="Chat-messages">{messages.map((n,i)=>(
              (i!=messages.length-1)?(
              (n.correct)? 
              <p className="correctFont">{(n.sender._id==me._id)?'You hit the answer!':`${n.sender.name} hit the answer!`}</p>
              :<p className="guessFont">{n.sender.name}: {n.body}</p>):(
                (n.correct)? 
              <p className="correctFont" ref={messagesEndRef} >{(n.sender._id==me._id)?'You hit the answer!':`${n.sender.name}hit the answer!`}</p>
              :<p className="guessFont" ref={messagesEndRef} >{n.sender.name}: {n.body}</p>
              )
        ))}</div>
            <Input.Search onChange={(e) => 
          setguessinput(e.target.value)} value={guessinput} id="searchBar" placeholder="guess here..." enterButton="send" disabled={!canGuess} onSearch={e=>{
            if(guessinput=="") displayStatus({type:"error", msg:"guess can't not be blank"});
            else{guessWord(e, me._id);
            setguessinput("")}}
            }></Input.Search>
            </div>
            <div className="chatright">{(drawing)? <Progress strokeColor={progcolor} type="circle" percent={roundTime}  format={()=>word} showInfo={isdrawer} className="progress" />:<></>}</div>
          </div>
        </div>
      </div>
    )
}

export default Room;