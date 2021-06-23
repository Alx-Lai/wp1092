import './App.css';
import Room from './Containers/Room';
import Begin from './Containers/Begin';
import { useState, useEffect } from "react";

const App= ()=> {
  const [start, setStart] = useState(false);
  const [me, setMe] = useState({});
  const [roomInfo, setRoomInfo] = useState([]);
  return (
    <div className="App">
      {start? (<Room me={me} info={roomInfo}/>) : (<Begin setStart = {setStart} setMe={setMe} me = {me} setInfo={setRoomInfo}/>)}
    </div>
  );
}

export default App;
