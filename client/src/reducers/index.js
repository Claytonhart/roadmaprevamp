import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import error from './error';
import board from './board';

export default combineReducers({
  alert,
  auth,
  error,
  board
});
