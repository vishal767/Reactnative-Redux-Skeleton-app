import * as TYPE from '../actions/types';
const initialState ={
  isLoggedIn :false,
  token:null,
  userID:null
}
export default function(state=initialState,action){
  switch(action.type){
    case TYPE.UPDATE_LOGIN:
        return {
            ...state,
            isLoggedIn:action.isLoggedIn,
            token:action.token,
            userID:action.userID
        }
    default:
        return state;
  }
}
