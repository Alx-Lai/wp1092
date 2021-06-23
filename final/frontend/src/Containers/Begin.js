import '../App.css';
import {Button, Input, Avatar, Badge} from "antd";
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { useState, useEffect} from "react";
import useGame from "../Hooks/useGame";
const Begin = ({setStart, setMe, me, setInfo})=>{  
    const colorList =["#BAD4AA","#73D2DE", "#FFE381","#C33C54","#A7ACD9", "#EF8354","#1C448E","#8CDEDC", "#38302E", "#FF715B","#FFA69E", "#424B54", "#84DCCF"]
    const [color, setcolor] = useState(0);
    const [colorhex, setcolorhex] = useState("#BAD4AA");
    const {joinRoom, status} = useGame();
    useEffect(() => setcolorhex(colorList[color]), [color])
    useEffect(() => {
        if(status.type == "JOINALL"){ //{type:"JOIN", data:[{name, score, color}]}
            setInfo(status.data);
            setStart(true)
        }
    }, [status])
    return(
        <div className="LogIn-view">
            <p className="LogIn-title">Gartic</p>
            <span><Avatar style={{ backgroundColor: colorhex }} size={90}  className="LogIn-avatar" icon={<UserOutlined />} />
            <EditOutlined onClick={()=>setcolor((color==11)? 0: color+1)} style={{ fontSize: '200%'}}/></span>
            <Input className="LogIn-name" size="large" placeholder="enter your name" prefix={<UserOutlined />} onChange={n=>{setMe({name: n.target.value, me:true, score:0, color:colorhex});}} />
            <Button type="primary" onClick={()=>{
                joinRoom(me)                
                }}>Play</Button>
        </div>
    )
}

export default Begin;