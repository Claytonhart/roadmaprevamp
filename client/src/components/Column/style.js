import styled from 'styled-components/macro';

export const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: #fff;
  border-radius: 5px;
  width: 250px;
  min-width: 250px;

  display: flex;
  flex-direction: column;
`;

export const TaskList = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
  flex-grow: 1;
  min-height: 100px;
`;

export const ColumnTasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 8px;
`;
