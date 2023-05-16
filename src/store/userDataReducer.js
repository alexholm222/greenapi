const data = JSON.parse(localStorage.getItem('userData'));

const defaultState = {
  userData: data || {},
};
const SET_DATA = 'SET_DATA';

export function userDataReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_DATA: 
      return {...state, userData: action.payload} 
    default: return state;
  }
};

export function setUserData(payload) {
  return {
    type: SET_DATA,
    payload
  }
};
