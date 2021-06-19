import '../App.css';
import {Button, Input, Avatar} from "antd";
import { UserOutlined } from '@ant-design/icons';

const Begin = ({setStart, setMe})=>{  
    const colorList =["254E70", "37718E", "8EE3EF"]
    return(
        <div className="LogIn-view">
            <p className="LogIn-title">Gartic</p>
            <Avatar style={{ backgroundColor: '#87d068' }} size={90} className="LogIn-avatar" icon={<UserOutlined />} />
            <Input className="LogIn-name" size="large" placeholder="enter your name" prefix={<UserOutlined />} onChange={n=>{setMe({name: n.target.value, me:true, score:0});}} />
            <Button type="primary" onClick={()=>setStart(true)}>Play</Button>
        </div>
    )
}

export default Begin;