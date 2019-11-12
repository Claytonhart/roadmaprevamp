import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import error from './error';
import board from './board';
import projects from './projects';
import currentProject from './currentProject';

export default combineReducers({
  alert,
  auth,
  error,
  board,
  projects,
  currentProject
});
