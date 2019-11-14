import {
  GET_CURRENT_USERS_PROJECTS,
  SET_PROJECTS_NAME,
  DELETE_PROJECT,
  CREATE_NEW_PROJECT,
  ADD_USER_TO_PROJECT,
  ADD_USER_ALREADY_EXISTS
} from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_USERS_PROJECTS: {
      return payload;
    }
    case SET_PROJECTS_NAME: {
      const { id, name } = payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          name
        }
      };
    }
    case CREATE_NEW_PROJECT: {
      return {
        ...state,
        [payload._id]: {
          ...payload
        }
      };
    }
    case DELETE_PROJECT: {
      const id = payload;
      return state.filter(project => project._id !== id);
    }
    case ADD_USER_TO_PROJECT: {
      const { projectId, userId } = payload;

      return {
        ...state,
        [projectId]: {
          ...state[projectId],
          users: [...state[projectId].users, userId]
        }
      };
    }
    case ADD_USER_ALREADY_EXISTS: {
      return state;
    }
    default:
      return state;
  }
}
