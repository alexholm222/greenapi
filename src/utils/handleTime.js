function handleTime(time) {
    let textTime 
    if(time === undefined || time === null || time === '') {
      textTime = '';
    } else {
      const date = new Date(time)
      const hours = date.getHours();
      const minutes = date.getMinutes();    
      textTime = `${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
    }
    return textTime;
  };
  
  export default handleTime;