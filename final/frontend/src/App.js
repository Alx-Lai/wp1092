import './App.css';
import Room from './Containers/Room';
import Begin from './Containers/Begin';
import { useState, useEffect } from "react";

const App= ()=> {
  const [start, setStart] = useState(false);
  return (
    <div className="App">
      {start? (<Room/>) : (<Begin setStart = {setStart}/>)}
    </div>
  );
}

export default App;
