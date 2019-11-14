import axios from 'axios';
import uuid from 'uuid';
import {
  GET_CURRENT_USERS_PROJECTS,
  SET_PROJECTS_NAME,
  DELETE_PROJECT,
  ADD_USER_TO_PROJECT,
  ADD_USER_ALREADY_EXISTS,
  CREATE_NEW_PROJECT
} from './types';

import { setAlert } from './alert';
import { arrayToObject } from '../utils/arrayToObject';

export const getCurrentUsersProjects = () => async dispatch => {
  try {
    const res = await axios.get(`/api/project`);

    // convert projects to an object w/ keys of each project's _id
    const projectsObj = arrayToObject(res.data, '_id');

    dispatch({
      type: GET_CURRENT_USERS_PROJECTS,
      payload: projectsObj
    });
  } catch (err) {
    console.log(err);
  }
};

export const setProjectsName = (id, name) => async dispatch => {
  try {
    const body = { name };

    await axios.put(`/api/project/${id}/name`, body);

    dispatch({
      type: SET_PROJECTS_NAME,
      payload: {
        id,
        name
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteProject = id => async dispatch => {
  try {
    await axios.delete(`/api/project/${id}`);

    dispatch({
      type: DELETE_PROJECT,
      payload: id
    });
  } catch (err) {
    console.log(err);
  }
};

export const addUserToProject = (projectId, userId) => async dispatch => {
  try {
    const body = { userId };
    await axios.put(`/api/project/${projectId}/users`, body);

    dispatch({
      type: ADD_USER_TO_PROJECT,
      payload: {
        projectId,
        userId
      }
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'red')));
    }

    dispatch({
      type: ADD_USER_ALREADY_EXISTS
    });
  }
};

export const createNewProject = name => async dispatch => {
  try {
    const firstColumnId = uuid.v4();
    const secondColumnId = uuid.v4();
    const thirdColumnId = uuid.v4();

    const body = {
      name,
      board: {
        tasks: [],
        columns: [
          {
            id: firstColumnId,
            title: 'To do',
            taskIds: []
          },
          {
            id: secondColumnId,
            title: 'In progress',
            taskIds: []
          },
          {
            id: thirdColumnId,
            title: 'Finished',
            taskIds: []
          }
        ],
        columnOrder: [firstColumnId, secondColumnId, thirdColumnId]
      }
    };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(`/api/project`, body, config);
    const id = res.data._id;

    dispatch({
      type: CREATE_NEW_PROJECT,
      payload: res.data
    });

    return id;
  } catch (err) {
    console.log(err);
  }
};

// export const setProjectName = (id, name) => async dispatch => {
//   try {
//     const body = { name };

//     await axios.put(`/api/project/${id}/setProjectName`, body);

//     dispatch({
//       type: SET_PROJECT_NAME,
//       payload: name
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
