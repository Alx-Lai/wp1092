import {Tag} from 'antd'
const ChatBox = ({chatLog, me}) => {
    return(
        chatLog.map(({sender, body}, i)=> {
            let name = sender.name
            if(name == me){
                return(
                    <p className="App-message" key={i} align="right">
                        {body}<Tag color="blue">{name}</Tag>
                    </p>
                )
            }else{
                return(
                    <p className="App-message" key={i}>
                        <Tag color="blue">{name}</Tag>{body}
                    </p>
                )
            }
        })
    )
}
export default ChatBox;