import '../App.css';
import {Button, Input} from "antd";
import { UserOutlined } from '@ant-design/icons';


const Begin = ({setStart})=>{  
    
    return(
        <div className="LogIn-view">
            <p className="LogIn-title">Gartic</p>
            <Input className="LogIn-name" size="large" placeholder="enter your name" prefix={<UserOutlined />} />
            <Button type="primary" onClick={()=>setStart(true)}>Play</Button>
        </div>
    )
}

export default Begin;