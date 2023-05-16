import './ChatList.scss';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import avatarDefault from '../../images/avatart-defult.png';
import ChatsItem from '../ChatsItem/ChatsItem';
import { greenApi } from '../../utils/Api';
import {ERROR_WATSUP_EXIST, ERROR_TEL_FORMAT, ERROR_LIMIT_REQUEST} from '../../utils/Constans'

function ChatList({logOut, setChatId, setNumber, setIsChatActive, chatList, setChatList, messages}) {
  const [addPopup, setAddPopup] = useState(false);
  const [tel, setTel] = useState('');
  const [createChatErr, setCreateChatErr] = useState('');
  const userData = useSelector(state => state.userDataReducer.userData);
  const refInput = useRef();

  function openAddPopup() {
    if(addPopup) {
      setAddPopup(false);
    } else {
      setAddPopup(true);
    }
  }

  function handleChangeTel(e) {
    setTel(e.target.value);
    setCreateChatErr('')
  }
  //функция создания чата
  function handleCreateChat(e) {
    e.preventDefault();
    const number = tel[0] === '8' ? `7${tel.slice(1)}` : tel;
    if(number.length < 11 || number.length > 12) {
      setCreateChatErr(ERROR_TEL_FORMAT); 
    } else {
      greenApi.checkWhatsapp(userData.id, userData.token, number)
      .then(res => {
        if (res.existsWhatsapp) {
          const cond = chatList.some(el => el.number === number)
          if(!cond) {
            setChatList((prevState) => [...prevState, {number: number}]);
          }
          setChatId(`${number}@c.us`);
          setNumber(number);
          setIsChatActive(true);
          setAddPopup(false);
          setTel('');
          } else {
          setCreateChatErr(ERROR_WATSUP_EXIST);
          setIsChatActive(false);
          }
      })
      .catch((err)=> {
        if(err.status === 466) {
          setCreateChatErr(ERROR_LIMIT_REQUEST);
        } else {
          setCreateChatErr(ERROR_TEL_FORMAT);
        }
        setIsChatActive(false);
      })
    }
  }
  //установка информации об активном чате
  function handleChatInfo({number}) {
    setChatId(`${number}@c.us`);
    setNumber(number);
    setIsChatActive(true);
  }
  //слушатель закрытия попапа по оверлею
  useEffect(() => {
    function closePopup(e) {
      const target = e.target;
      if (!target.closest(`.popup_chats`)) {
        setAddPopup(false);
      }
    }
    
    document.addEventListener("mousedown", closePopup)
    return () => {
      document.removeEventListener("mousedown", closePopup)
    }
  },[])

  useEffect(() => {
    refInput.current.focus();
  },[addPopup])
  
  return (
    <div className='chats'>
      <div className='chats__header'>
        <img alt='Аватар' className='avatar avatar_header' src={avatarDefault}></img>
        <div className='chats__icons'>
          <div onClick={openAddPopup} className='chats__icon chats__icon_add'>
            <svg viewBox="0 0 24 24" height="24" width="24"  xmlns="http://www.w3.org/2000/svg"><path fill="#626262" d="M19.005,3.175H4.674C3.642,3.175,3,3.789,3,4.821V21.02 l3.544-3.514h12.461c1.033,0,2.064-1.06,2.064-2.093V4.821C21.068,3.789,20.037,3.175,19.005,3.175z M14.016,13.044H7.041V11.1 h6.975V13.044z M17.016,9.044H7.041V7.1h9.975V9.044z"></path></svg>
          </div>
          <div onClick={logOut} className='chats__icon chats__icon_exit'>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 5L12.59 6.41L14.17 8H6V10H14.17L12.59 11.58L14 13L18 9L14 5ZM2 2H9V0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H9V16H2V2Z" fill="#626262"/>
            </svg>
          </div>
        </div>  
      </div>
      <div className='chats__search'>
        <form noValidate className='chats__form'>
          <button type='submit' className='chats__button chats__button_form'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.4351 10.0629H10.7124L10.4563 9.81589C11.3528 8.77301 11.8925 7.4191 11.8925 5.94625C11.8925 2.66209 9.23042 0 5.94625 0C2.66209 0 0 2.66209 0 5.94625C0 9.23042 2.66209 11.8925 5.94625 11.8925C7.4191 11.8925 8.77301 11.3528 9.81589 10.4563L10.0629 10.7124V11.4351L14.6369 16L16 14.6369L11.4351 10.0629ZM5.94625 10.0629C3.66838 10.0629 1.82962 8.22413 1.82962 5.94625C1.82962 3.66838 3.66838 1.82962 5.94625 1.82962C8.22413 1.82962 10.0629 3.66838 10.0629 5.94625C10.0629 8.22413 8.22413 10.0629 5.94625 10.0629Z" fill="#626262"/>
            </svg>
          </button>
          <input type='text' placeholder='Поиск' className='chats__input'></input>
        </form>
      </div>
      <div className='chats__box'>
      <ul className='chats__list'>
        {chatList.map(el => {
          return <ChatsItem messages={messages} chatData={handleChatInfo} key={el.number} chatId={`${el.number}@c.us`} number={el.number}/>
        })}
      </ul>
      </div>
      <div className='popup popup_chats' style={{transform: `${addPopup ? 'translate(0)' : 'translate(-100%)'}`}}>
        <div className='popup__header'>
        <svg style={{transform: `${addPopup ? 'translate(0)' : 'translate(-100%)'}`}} onClick={openAddPopup}  viewBox="0 0 24 24" height="24" width="24" version="1.1" x="0px" y="0px"xmlns="http://www.w3.org/2000/svg"><path fill="#ffff" d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"></path></svg>
          <p style={{transform: `${addPopup ? 'translate(0)' : 'translate(-100%)'}`}} className='popup__text popup__text_header'>Новый чат</p>
        </div>
        <form className='chats__form chats__form_popup'>
          <button onClick={handleCreateChat} type='submit' className='chats__button chats__button_popup'>
            <svg width="24px" height="24px" viewBox="0 0 16 16" class="bi bi-plus" fill="#a2a2a2" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
              <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
            </svg>
          </button>
          <input ref={refInput} value={tel || ''} onChange={handleChangeTel} required type='number' minLength={1} placeholder='Введите номер телефона' className='chats__input'></input>
          <span className='chats__error'>{createChatErr}</span>
        </form>
      </div>
    </div>
  )
};

export default ChatList;