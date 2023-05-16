import './Chat.scss';
import Message from '../Message/Message';
import avatarDefault from '../../images/avatart-defult.png';
import { useEffect ,useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useSize from '../../utils/useSize';
import { greenApi } from '../../utils/Api';
import { ERROR_SEND_MESSAGE, ENTER_MESSAGE } from '../../utils/Constans';
import handleTime from '../../utils/handleTime';

function Chat({id, number, setMessages, messages}) {
  const [heightChat, setHeightChat] = useState('62');
  const [error, setError] = useState('');
  const refSend = useRef();
  const refText = useRef();
  const sizeElSend = useSize(refSend);
  const userData = useSelector(state => state.userDataReducer.userData);

  useEffect(() => {
    if (sizeElSend !== undefined) {
      setHeightChat(sizeElSend.height + 10)
    }
  },[sizeElSend]);

  useEffect(() => {
    refText.current.textContent = '';
    refText.current.focus();
    setError('');
  },[id])

  function handleEnterSend(e) {
    if(e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }}
  

 //Отправка сообщений
  function handleSendMessage(e) {
    e.preventDefault();
    const message = refText.current.textContent
    if(refText.current.textContent !== '') {
      greenApi.sendMessage(userData.id, userData.token, number, message)
      .then(() => {
        setMessages((prevState) => [...prevState, {text: message, time: Date(), chatId: id, type: 'out'}]);
        refText.current.textContent = ''; 
        setError('');
      })
      .catch(err => {
        console.log(err);
        setError(ERROR_SEND_MESSAGE)
      })
    }  else {
      setError(ENTER_MESSAGE)
    }
  };

  return (
    <div className='chat' onKeyDown={handleEnterSend}>
      <div className='chat__header'>
        <img alt='Аватар' className='avatar avatar_header' src={avatarDefault}></img>
        <p className='chat__name'>{`+${number}`}</p>
      </div>
      <div className='chat__window' style={{height: `calc(100vh - 59px  - ${heightChat + 10}px)`}}>
        {messages.filter(el => el.chatId === id).reverse().map((elem) => {
          return <Message key={messages.indexOf(elem)} text={elem.text} time={handleTime(elem.time)} type={elem.type}/> 
        })}
      </div>
      <div ref = {refSend} className='chat__send'>
        <div className='chat__buttons'></div>
        <form onSubmit={handleSendMessage} noValidate className='chat__form'>
          <div ref={refText}  contentEditable='true' placeholder='Введите сообщение' className='chat__input'></div>
          <span className='chat__error'>{error}</span>
          <button className='chat__button chat__button_form' type='submit'>
            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg"><path fill="#54656f" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
          </button>
        </form>
      </div>
    </div>
  )
};

export default Chat;