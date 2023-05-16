import './Main.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChatList from '../ChatsList/ChatsList';
import Fon from '../Fon/Fon';
import Chat from '../Chat/Chat';
import { greenApi } from '../../utils/Api';

function Main({logOut}) {
  const [isChatActive, setIsChatActive] = useState(JSON.parse(localStorage.getItem("isChatActive")) || false);
  const [chatList, setChatList] = useState(JSON.parse(localStorage.getItem("chatList")) || []);
  const [chatId, setChatId] = useState(JSON.parse(localStorage.getItem("chatId")) || '');
  const [number, setNumber] = useState(JSON.parse(localStorage.getItem("number")) || '');
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("messages")) || []);
  const userData = useSelector(state => state.userDataReducer.userData);
  //получение входящих сообщений
  useEffect(() => {
    async function subScribe() {
      const response = await greenApi.getMessage(userData.id, userData.token);
      if(response === null) {
        await subScribe();
      } else {
        await greenApi.deleteMessage(userData.id, userData.token, response.receiptId)
          .then((res)=> { 
            if(res.result) {
              const data = response.body
              const messageText = data.messageData.textMessageData.textMessage;
              const message = {text: messageText, 
                               time: Date(response.body.timestamp), 
                               chatId: data.senderData.chatId,
                               messageId: data.idMessage, 
                               type: 'in'};
      
              setMessages((prevState) =>  [...prevState, message]);
              subScribe(); 
            }
          }
          )
          .catch(err => {
            console.log(err);
            subScribe();
          })
      }
    }
    subScribe();
     
  },[]);
  //При получении нового сообщения, чат куда пришло сообщение занимает верхнюю строчку
  useEffect(() => {
    if(chatList.length > 0 && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const chatEl = chatList.find(el => el.number === lastMessage.chatId.slice(0,-5))
      if(chatEl !== undefined) {
        const filterList = chatList.filter(el => el.number !== lastMessage.chatId.slice(0,-5));
        setChatList(filterList)
        setChatList((prevState) => [...prevState, chatEl]);
      }
    } 
  },[messages]);

  useEffect(() => {
    localStorage.setItem('chatList', JSON.stringify(chatList));
    localStorage.setItem('messages', JSON.stringify(messages));
    localStorage.setItem('chatId', JSON.stringify(chatId));
    localStorage.setItem('number', JSON.stringify(number));
    localStorage.setItem('isChatActive', JSON.stringify(isChatActive));
  },[chatId, chatList, isChatActive, messages, number])

  return (
    <div className='main'>
      <ChatList messages={messages} logOut={logOut} setChatId={setChatId} setNumber={setNumber} setIsChatActive={setIsChatActive} chatList={chatList} setChatList={setChatList}/>
      {isChatActive ? <Chat id={chatId} number={number} setMessages={setMessages} messages={messages}/> : <Fon/>}
    </div>
  )
};

export default Main;