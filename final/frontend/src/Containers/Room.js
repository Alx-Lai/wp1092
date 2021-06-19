import '../App.css';
import Canvas from '../Components/Canvas';
import { useState, useEffect } from "react";
import UserList from '../Components/UserList';

const Room = ({me})=>{ 
    const [users, setusers] = useState([me, {name: "test1", score: 50, me:false}, {name: "test2", score: 2000, me:false}]); 
    return(

        <div className="PlayScreen">
        <div className="UserList-view"><UserList users={users}/></div>
        <div className="CanvasAndChat-view">
          <Canvas />
          <div className = "Chat"></div>
        </div>
      </div>
    )
}

export default Room;