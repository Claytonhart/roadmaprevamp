import React from 'react';
import styled from 'styled-components/macro';

import BoardContainer from './Board/BoardContainer';
import Sidebar from 'components/Sidebar';

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  overflow: hidden;
`;

const Project = () => {
  return (
    <>
      <Sidebar />
      <MainContainer>
        <h1>Project Name</h1>
        <BoardContainer />
      </MainContainer>
    </>
  );
};

export default Project;
