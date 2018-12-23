import * as TYPE from '../actions/types';
const initialState ={
  WDCode: "string",
  Name: "string",
  website: "string",
  GSTNo: "string",
  email: "string",
  emailVerified: true,
  notificationId: "string"
}
export default function(state=initialState,action){
  switch(action.type){
    case TYPE.UPDATE_PROFILE:
        return {
            ...state,
        }
    default:
        return state;
  }
}
