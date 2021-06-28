import '../App.css';
import {Button, Input, Avatar, Badge} from "antd";
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { useState, useEffect} from "react";
import useGame from "../Hooks/useGame";
const Begin = ({start, setStart, setMe, me, setInfo, displayStatus})=>{  
    const colorList =["#BAD4AA","#73D2DE", "#FFE381","#C33C54","#A7ACD9", "#EF8354","#1C448E","#8CDEDC", "#38302E", "#FF715B","#FFA69E", "#424B54", "#84DCCF"]
    const [color, setcolor] = useState(0);
    const [colorhex, setcolorhex] = useState("#BAD4AA");
    const {joinRoom, status} = useGame({displayStatus});
    const [keyPressed, setKeyPressed] = useState(false);
    useEffect(
        () => {
            console.log(color);
            setcolorhex(colorList[color])
            setMe({name: me.name, me:true, score:0, color:colorList[color]});
        }, 
    [color])


    function downHandler({ key }) {
        console.log(key)
        if (key === "Enter") {
          setKeyPressed(true);
        }
      }
      // If released key is our target key then set to false
      const upHandler = ({ key }) => {
        if (key === "Enter") {
          setKeyPressed(false);
        }
    };
    useEffect(() => {
        if(keyPressed){
            if(me.name.trim()=="") displayStatus({type:"error", msg:"name cannot be blank"})
                else if (me.name.length>20) displayStatus({type:"error", msg:"name too long (>20)"})
                else joinRoom(me);
        }
    }, [keyPressed])

    useEffect(() => {
        if(!start){
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        // Remove event listeners on cleanup
        return () => {
          window.removeEventListener("keydown", downHandler);
          window.removeEventListener("keyup", upHandler);
        };
        }
        
    }, []);


    useEffect(() => {
        if(status.type == "JOINALL"){ //{type:"JOIN", data:[{name, score, color}]}
            setInfo(status.data);
            let newme = me;
            newme._id = status.data.id;
            setMe(newme);
            setStart(true)
        }
    }, [status])

    useEffect(() => {
        console.log(colorhex);
    }, [colorhex])
    return(
        <div className="LogIn-view">
            <p className="LogIn-title">Gartic</p>
            <span><Avatar style={{ backgroundColor: colorhex }} size={90}  className="LogIn-avatar" icon={<UserOutlined />}/>
            <EditOutlined onClick={()=>{
                console.log("click");
                setcolor((color==11)? 0: color+1)
            }} style={{ fontSize: '200%'}}/></span>
            <Input className="LogIn-name" size="large" placeholder="enter your name" prefix={<UserOutlined />} onChange={n=>{setMe({name: n.target.value, me:true, score:0, color:colorhex});}} />
            <Button type="primary" onClick={()=>{
                if(me.name.trim()=="") displayStatus({type:"error", msg:"name cannot be blank"})
                else if (me.name.length>20) displayStatus({type:"error", msg:"name too long (>20)"})
                else joinRoom(me);             
                }}>Play</Button>
        </div>
    )
}

export default Begin;