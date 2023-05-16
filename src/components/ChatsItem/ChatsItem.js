import './ChatsItem.scss';
import avatarDefault from '../../images/avatart-defult.png';
import { useEffect, useState } from 'react';
import handleTime from '../../utils/handleTime';

function ChatsItem({chatId, number, chatData, messages}) {
  const [lastMessage, setLastMessage] = useState('');
  const [timeMessage, setTimeMessage] = useState('');
  
  function handleChat() {
    chatData({
      number,
    })
   }

   useEffect(() => {
    const arr = messages.filter(el => el.chatId === chatId);
    if(arr.length > 0) {
      setLastMessage(arr.reverse()[0].text)
      setTimeMessage(arr[0].time)
    }
   },[chatId, messages])

  return (
    <div onClick={handleChat} id={chatId} className='item'>
      <img src={avatarDefault} alt='Аватар' className='avatar avatar_item'></img>
      <div className='item__container'>
        <div className='item__block item__block_info'>
          <p className='item__text item__text_number'>{`+${number}`}</p>
          <p className='item__text item__text_time'>{handleTime(timeMessage)}</p>
        </div>
        <div className='item__block item__block_message'>
        <p className='item__text item__text_message'>{lastMessage}</p>   
        </div>
      </div>
    </div>
  )
};

export default ChatsItem;