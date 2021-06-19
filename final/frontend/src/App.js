import './App.css';
import Room from './Containers/Room';
import Begin from './Containers/Begin';
import { useState, useEffect } from "react";

const App= ()=> {
  const [start, setStart] = useState(false);
  const [me, setMe] = useState({});
  return (
    <div className="App">
      {start? (<Room me={me}/>) : (<Begin setStart = {setStart} setMe={setMe}/>)}
    </div>
  );
}

export default App;
