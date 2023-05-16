import './Login.scss';
import { greenApi } from '../../utils/Api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../store/userDataReducer';
import * as Constans from '../../utils/Constans';

function Login() {
  const [error, setError] = useState('');
  const [id, setId] = useState('');
  const [token, setToken] =useState('');
  const [numberOwner, setNumberOwner] = useState('');
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserData({id, token, numberOwner: numberOwner}));
    localStorage.setItem('userData', JSON.stringify({id: id, token: token}));
  },[id, numberOwner, token])
  
  function handleChangeId(e) {
    setId(e.target.value);
  };

  function handleChangeToken(e) {
    setToken(e.target.value);
  };
  
  function handleSubmit(e) {
    e.preventDefault();

    greenApi.getStateInstance(id, token)
    .then(res => {
      if(res.stateInstance === 'authorized') {
        nav('/');
        localStorage.setItem('isLogin', true);
      } else if(res.stateInstance === 'blocked') {
        setError(Constans.ERROR_BLOCKED)
      } else if(res.stateInstance === 'sleepMode') {
        setError(Constans.ERROR_SLEEP)
      } else if(res.stateInstance === 'notAuthorized') {
        setError(Constans.ERROR_NOT_AUTH)
      } else if(res.stateInstance === 'starting') {
        setError(Constans.ERROR_STARTING)
      }

    }).catch(err => {
      if (err.status === 401) {
      setError(Constans.ERROR_DATA);
    } else {
      setError(Constans.BAD_INTERNET);
    }
  })

    greenApi.getSettings(id, token)
     .then(res => setNumberOwner(String(res.wid).slice(0, -5)))
     .catch(err => console.log(err))
  }

  return (
    <div className='login'>
      <div className='login__header'></div>
      <div className='login__window'>
        <h2 className='login__title'>Войти в месенджер</h2>
        <form noValidate onSubmit={handleSubmit} className='login__form'>
          <p className='login__text'>idInstance</p>
          <input type = 'number' value = {id || ''} onChange = {handleChangeId} className='login__input' placeholder='Введите id' required min="1" step="1"></input>
          <p className='login__text'>apiTokenInstance</p>
          <input value = {token || ''} onChange = {handleChangeToken} className='login__input' type='text' placeholder='Введите token' required></input>
          <button type='submith' className='login__button'>Войти</button>
        </form>
        <p className='login__text login__text_err'>{error}</p>
      </div>
    </div>
  )
};

export default Login;