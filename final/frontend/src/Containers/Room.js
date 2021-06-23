import '../App.css';
import Canvas from '../Components/Canvas';
import { useState, useEffect } from "react";
import UserList from '../Components/UserList';
import {Input} from "antd";
import useGame from "../Hooks/useGame";
import Waiting from './Waiting';
const Room = ({me, info})=>{ 
    const [users, setusers] = useState([me]); 
    const [usernum, setusernum] = useState(1);
    const {status} = useGame();
    const [gamestart, setgamestart] = useState(false);
    const [displayText, setdisplayText] = useState("gartic")
    useEffect(() => {
      if(status.type == "START"){ //{type:"START"}
        // setStart(true)
        setgamestart(true);
      }
      if(status.type == "JOIN"){ 
        setusers([...users, {name: status.data.userList.name, me: false, score: status.data.userList.score, color: status.data.userList.color }])
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
          {/* <Canvas /> */}
          <div className="Canvas">{displayText}</div>
          <Waiting num={usernum} visible={!gamestart} />
          <div className = "Chat">
            <div className="Chat-messages"></div>
            <Input.Search id="searchBar" placeholder="guess here..." enterButton="send"></Input.Search>
          </div>
        </div>
      </div>
    )
}

export default Room;