import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import error from './error';

export default combineReducers({
  alert,
  auth,
  error
});
