import '../App.css';
import Canvas from '../Components/Canvas';
import { useState, useEffect } from "react";
import UserList from '../Components/UserList';
import {Input} from "antd";
const Room = ({me})=>{ 
    const [users, setusers] = useState([me]); 
    return(

        <div className="PlayScreen">
        <div className="UserList-view"><UserList users={users}/></div>
        <div className="CanvasAndChat-view">
          <Canvas />
          <div className = "Chat">
            <div className="Chat-messages"></div>
            <Input.Search placeholder="guess here..." enterButton="send"></Input.Search>
          </div>
        </div>
      </div>
    )
}

export default Room;