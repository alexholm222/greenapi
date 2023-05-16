import './Message.scss';

function Message({text, time, type}) {
  return (
    <div className={`message ${type === 'out' ? 'message_out' : 'message_in'}`}>
      <div className={`message__container ${type === 'out' ? 'message__container_out' : 'message__container_in'}`}>
        <p className='message__text'>{text}</p>
        <p className='message__text message__text_time'>{time}</p>
        <div className='message__status'></div>
      </div>
    </div>
  )
};

export default Message;