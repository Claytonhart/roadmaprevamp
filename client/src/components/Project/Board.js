import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import initialData from '../../initial-data';
import Column from '../Column';

const Container = styled.div`
  display: flex;
`;

const Board = () => {
  const [boardState, setBoardState] = useState(initialData);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    // do nothing and return draggable to original position if no destination
    if (!destination) {
      return;
    }

    // if dropped in original column, and index, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // updating column draggable component order
    if (type === 'column') {
      const newColumnOrder = Array.from(boardState.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...boardState,
        columnOrder: newColumnOrder
      };

      setBoardState(newState);
      return;
    }

    const start = boardState.columns[source.droppableId];
    const finish = boardState.columns[destination.droppableId];

    // Moving within one list
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newBoardState = {
        ...boardState,
        columns: {
          ...boardState.columns,
          [newColumn.id]: newColumn
        }
      };

      setBoardState(newBoardState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newState = {
      ...boardState,
      columns: {
        ...boardState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    setBoardState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {boardState.columnOrder.map((columnId, index) => {
              const column = boardState.columns[columnId];
              const tasks = column.taskIds.map(
                taskId => boardState.tasks[taskId]
              );

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
