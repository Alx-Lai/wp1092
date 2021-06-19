import '../App.css';
import Canvas from '../Components/Canvas';
const Room = ()=>{  
    return(
        <div className="PlayScreen">
        <div className="UserList-view"></div>
        <div className="CanvasAndChat-view">
          <Canvas />
          <div className = "Chat"></div>
        </div>
      </div>
    )
}

export default Room;