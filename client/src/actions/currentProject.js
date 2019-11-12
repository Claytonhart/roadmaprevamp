import { SET_CURRENT_PROJECT_DATA } from './types';

export const setCurrentProjectData = project => {
  return {
    type: SET_CURRENT_PROJECT_DATA,
    payload: project
  };
};
