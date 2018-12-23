import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import appReducers from './appReducers';
import loginReducers from './loginReducers';
const rootReducer = combineReducers({

  app: appReducers,
  auth:loginReducers
});

export default rootReducer;
