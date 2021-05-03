import './App.css'
import { useState } from 'react'
import Shop from './containers/Shop'
import Customer from './containers/Customer'
import LoginPage from './containers/LoginPage'

function App() {
    const [mode,setMode] = useState(0);
  return (
    <div className="App">
        {
        if(mode == 0){
            <LoginPage />
        }else if(mode == 1){
            <Customer />
        }else if(mode == 2){
            <Shop />
        }
        }
    </div>
  );
}

export default App;
