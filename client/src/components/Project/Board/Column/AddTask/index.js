import React, { useState } from 'react';
import AddTaskForm from './AddTaskForm';
import AddTaskButton from './AddTaskButton';

const AddTask = ({ column }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <AddTaskButton setIsActive={setIsActive} />
      {isActive && <AddTaskForm column={column} setIsActive={setIsActive} />}
    </>
  );
};

export default AddTask;
