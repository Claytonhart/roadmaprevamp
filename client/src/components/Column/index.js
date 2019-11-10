import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from '../Task';
import AddTask from '../AddTask';
import ColumnTitle from '../ColumnTitle.js';
import { Container, Title, TaskList, ColumnTasksContainer } from './style';

const Column = props => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <ColumnTitle provided={provided} column={props.column} />
          <ColumnTasksContainer>
            <AddTask column={props.column} />
            <Droppable droppableId={props.column.id} type='task'>
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {props.tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </ColumnTasksContainer>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
