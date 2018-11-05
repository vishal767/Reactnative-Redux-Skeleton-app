import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import appReducers from './appReducers';



const rootReducer = combineReducers({

  app: appReducers,
}); 

export default rootReducer;
