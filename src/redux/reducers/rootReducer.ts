import { combineReducers } from 'redux';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';
import roomReducer from './roomReducer';

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  room: roomReducer
});
export default rootReducer;
