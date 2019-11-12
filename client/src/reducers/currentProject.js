import {
  SET_CURRENT_PROJECT_DATA,
  CLEAR_CURRENT_PROJECT,
  SET_CURRENT_PROJECT_NAME
} from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_PROJECT_DATA: {
      return {
        ...state,
        ...payload
      };
    }
    case CLEAR_CURRENT_PROJECT: {
      return {
        ...initialState
      };
    }
    case SET_CURRENT_PROJECT_NAME: {
      const name = payload;
      return {
        ...state,
        name
      };
    }
    default:
      return state;
  }
}
