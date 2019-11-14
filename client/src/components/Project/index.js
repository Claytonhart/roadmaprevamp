import React from 'react';
import styled from 'styled-components/macro';

import BoardContainer from './Board/BoardContainer';
import Sidebar from 'components/Sidebar';
import TopBar from './TopBar';

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
        <TopBar />
        <BoardContainer />
      </MainContainer>
    </>
  );
};

export default Project;
