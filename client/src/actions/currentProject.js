import { SET_CURRENT_PROJECT_DATA, CLEAR_CURRENT_PROJECT } from './types';

export const setCurrentProjectData = project => {
  return {
    type: SET_CURRENT_PROJECT_DATA,
    payload: project
  };
};

export const clearProject = () => {
  return {
    type: CLEAR_CURRENT_PROJECT
  };
};
