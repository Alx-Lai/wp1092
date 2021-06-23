import '../App.css';
import Canvas from '../Components/Canvas';
import { useState, useEffect } from "react";
import UserList from '../Components/UserList';
import {Input} from "antd";
import useGame from "../Hooks/useGame";
const Room = ({me, info})=>{ 
    const [users, setusers] = useState([me]); 
    const {status} = useGame();
    useEffect(() => {
      if(status.type == "START"){ //{type:"START"}
        // setStart(true)
        console.log("start");
      }
      if(status.type == "JOIN"){ 
        setusers(...users, {name: status.data.name, me: false, score: status.data.score, color: status.data.color })
      }
      if(status.type == "DRAW"){
        //TODO
      }
    }, [status])

    useEffect(() => {
      setusers(me,...info.map(n=>{
        let a = n;
        a.me = false;
        return a;
      }))
    }, [info])
    return(

        <div className="PlayScreen">
        <div className="UserList-view"><UserList users={users}/></div>
        <div className="CanvasAndChat-view">
          <Canvas />
          <div className = "Chat">
            <div className="Chat-messages"></div>
            <Input.Search id="searchBar" placeholder="guess here..." enterButton="send"></Input.Search>
          </div>
        </div>
      </div>
    )
}

export default Room;