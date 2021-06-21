import React from 'react';
import { Tag , Divider } from 'antd';

const conststyle = {
    margin: '0px 8px 0px 8px'
}

const Message = ({me, sender, body, id}) => {
    let message = body.replace(/([^\n]{1,25})/g, '[$1]\n').split("\n");
    message.pop()   
    
    const boxmessage = (sender === me)?
            <>
                <div  key={id} style={{margin: 'auto', display: 'flex', justifyContent: 'flex-end',alignItems: 'center'}} >
                    <div>
                        {message.map((value, idx) => {
                            return (<p key={idx+"_p"} style={{margin: '0'}}>{value.replace('[','').replace(']','')}</p>)
                        })}
                    </div>
                    <Tag color="blue" style={{margin: '8px 8px 8px 8px'}}>{sender}</Tag> 
                </div>
            </>
        :
            <>
                <div  key={id} style={{margin: 'auto', display: 'flex', justifyContent: 'flex-start',alignItems: 'center'}} >
                    <Tag color="green" style={{margin: '8px 8px 8px 8px'}}>{sender}</Tag> 
                    <div>
                        {message.map((value, idx) => {
                            return (<p key={idx+"_p"} style={{margin: '0'}}>{value.replace('[','').replace(']','')}</p>)
                        })}
                    </div>
                </div>
            </>

        
    return boxmessage
};


export default Message;