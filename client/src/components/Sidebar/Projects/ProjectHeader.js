import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import CreateProjectModal from 'components/CreateProjectModal';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${props => props.theme.primary.lightgrey};
  padding: 8px;

  transition: all 0.2s;

  &:hover {
    > span {
      opacity: 1;
    }
  }
`;

const HeaderLink = styled(Link)`
  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    text-decoration-color: #fff;
  }
`;

const Header = styled.h3`
  color: ${props => props.theme.primary.white};
`;

const HeaderIcon = styled.span`
  opacity: 0;
  cursor: pointer;
`;

const ProjectHeader = () => {
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  const createProject = () => {
    setShowCreateProjectModal(true);
  };

  return (
    <HeaderContainer>
      <HeaderLink to='/projects'>
        <Header>Your Projects</Header>
      </HeaderLink>
      <HeaderIcon onClick={createProject}>
        <i className='fas fa-plus'></i>
      </HeaderIcon>
      {showCreateProjectModal && (
        <CreateProjectModal
          isVisible={showCreateProjectModal}
          title={'Create a new project'}
          onClose={() => setShowCreateProjectModal(false)}
          setShouldUpdate={() => {}}
        />
      )}
    </HeaderContainer>
  );
};

export default ProjectHeader;
