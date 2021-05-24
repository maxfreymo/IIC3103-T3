import React, {useState, useEffect} from 'react';
//import Socket from "./Socket";


function Chat({Socket}) {
    
    const [userText, setUser] = useState("");
    const [messageText, setMessage] = useState("");
    const [chatText, setChat] = useState([]);

    const onChangeTextUser = ({ target: { value } }) => {
        setUser(value);
      };

    const onChangeTextMessage = ({ target: { value } }) => {
        setMessage(value);
      };

    const onPressSend = () => {
        Socket.emit("CHAT", { name: userText, message: messageText });
      };

    useEffect (()=>{
        Socket.on('CHAT', (data) => {
            setChat([...chatText, data]);
        })

    }, [chatText, Socket]);

    return (
        <div id="container">
        <input type="text" id="username"  onChange={onChangeTextUser} value={userText} placeholder="Username"></input>
        <input type="text" id="message" onChange={onChangeTextMessage} value={messageText} placeholder="Message"></input>
        <button id="button-send" onClick={onPressSend}> Enviar </button>
        <div id="chat-window">
            {chatText.map((e,i) => <div key={i}> <b>{e.name}</b>:{e.message} - <i>date:{e.date} </i></div>)}
        </div>

        </div>
)};

export default Chat;