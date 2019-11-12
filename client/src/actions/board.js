import axios from 'axios';
import uuid from 'uuid';

import sanatizeBoardState from '../utils/sanatizeBoardState';

import {
  GET_BOARD,
  SET_COLUMN_ORDER,
  SET_TASK_IN_SAME_COLUMN,
  SET_TASK_IN_NEW_COLUMN,
  SET_COLUMN_TITLE,
  UPDATE_EXISTING_TASK,
  CREATE_NEW_TASK,
  DELETE_TASK,
  DELETE_COLUMN,
  CREATE_NEW_COLUMN,
  GET_BOARD_BY_ID,
  SET_CURRENT_PROJECT_DATA,
  CLEAR_BOARD
} from './types';

import initialData from '../initial-data';

export const getBoard = () => {
  return {
    type: GET_BOARD,
    payload: initialData
  };
};

export const getBoardById = projectId => async dispatch => {
  try {
    const res = await axios.get(`/api/project/${projectId}`);
    const { data } = res;
    console.log('board data: ' + JSON.stringify(data, null, 3));
    // const { users,  _id: id, name, owner, board, createdDate, editedDate, __v  } = data;
    const { board, _id: id, ...projectData } = data;

    const newBoard = sanatizeBoardState(board);

    dispatch({
      type: GET_BOARD_BY_ID,
      payload: newBoard
    });

    dispatch({
      type: SET_CURRENT_PROJECT_DATA,
      payload: {
        id,
        ...projectData
      }
    });
    return id;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const clearBoard = () => {
  return {
    type: CLEAR_BOARD
  };
};

export const setColumnOrder = (projectId, order) => async dispatch => {
  try {
    const body = { columnOrder: order };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    await dispatch({
      type: SET_COLUMN_ORDER,
      payload: order
    });

    const res = await axios.put(
      `/api/project/${projectId}/columnorder`,
      body,
      config
    );
    const { data } = res;
    const { board } = data;
    const { columnOrder } = board;

    if (JSON.stringify(order) !== JSON.stringify(columnOrder)) {
      // set error instead of forcing column change
      dispatch({
        type: SET_COLUMN_ORDER,
        payload: columnOrder
      });
    }
  } catch (err) {
    console.log(err);
    console.log('set column order error');
  }
};

export const setTaskInSameColumn = (projectId, taskOrder) => async dispatch => {
  try {
    // const projectId = "5db53af211de1c625467b454";

    const body = { column: taskOrder };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    await dispatch({
      type: SET_TASK_IN_SAME_COLUMN,
      payload: taskOrder
    });

    await axios.put(`/api/project/${projectId}/column/same`, body, config);
  } catch (err) {
    console.log(err);
  }
};

export const setTaskInNewColumn = (
  projectId,
  startColumn,
  finishColumn
) => async dispatch => {
  try {
    // const projectId = "5db53af211de1c625467b454";

    const body = { startColumn, finishColumn };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    await dispatch({
      type: SET_TASK_IN_NEW_COLUMN,
      payload: {
        startColumn,
        finishColumn
      }
    });

    await axios.put(`/api/project/${projectId}/column/different`, body, config);
  } catch (err) {
    console.log(err);
  }
};

export const setColumnTitle = (projectId, title, column) => async dispatch => {
  try {
    // const projectId = "5db53af211de1c625467b454";
    const body = { title, column };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    await dispatch({
      type: SET_COLUMN_TITLE,
      payload: {
        title,
        column
      }
    });

    await axios.put(`/api/project/${projectId}/column/title`, body, config);
  } catch (err) {
    console.log(err);
  }
};

export const updateExistingTask = (
  projectId,
  task,
  content
) => async dispatch => {
  try {
    // const projectId = "5db53af211de1c625467b454";
    const body = { task, content };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    await dispatch({
      type: UPDATE_EXISTING_TASK,
      payload: {
        task,
        content
      }
    });

    await axios.put(`/api/project/${projectId}/title`, body, config);
  } catch (err) {
    console.log(err);
  }
};

export const createNewTask = (projectId, column, content) => async dispatch => {
  try {
    // const projectId = "5db53af211de1c625467b454";

    const taskId = uuid.v4();

    const body = { column, content, taskId };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    await dispatch({
      type: CREATE_NEW_TASK,
      payload: {
        column,
        content,
        taskId
      }
    });

    await axios.post(`/api/project/${projectId}/task`, body, config);
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = (projectId, column, task) => async dispatch => {
  try {
    // const projectId = "5db53af211de1c625467b454";

    await dispatch({
      type: DELETE_TASK,
      payload: {
        column,
        task
      }
    });

    await axios.delete(
      `/api/project/${projectId}/task/${column.id}/${task.id}`
    );
  } catch (err) {
    console.log(err);
  }
};

export const deleteColumn = (projectId, column) => async dispatch => {
  try {
    // const projectId = "5db53af211de1c625467b454";

    await dispatch({
      type: DELETE_COLUMN,
      payload: column
    });

    await axios.delete(`/api/project/${projectId}/column/${column.id}`);
  } catch (err) {
    console.log(err);
  }

  // return {
  //   type: DELETE_COLUMN,
  //   payload: column
  // };
};

export const createNewColumn = (projectId, title) => async dispatch => {
  try {
    // const projectId = "5db53af211de1c625467b454";

    const columnId = uuid.v4();

    const body = { columnId, title };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // update new uuid
    await dispatch({
      type: CREATE_NEW_COLUMN,
      payload: {
        title,
        columnId
      }
    });

    await axios.post(`/api/project/${projectId}/column`, body, config);
  } catch (err) {
    console.log(err);
  }
};
