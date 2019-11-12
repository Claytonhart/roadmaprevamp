import React from 'react';
import { NewTaskButtonContainer } from './style';

const AddTaskButton = ({ setIsActive }) => {
  return (
    <NewTaskButtonContainer onClick={() => setIsActive(true)}>
      + Add a task
    </NewTaskButtonContainer>
  );
};

export default AddTaskButton;
