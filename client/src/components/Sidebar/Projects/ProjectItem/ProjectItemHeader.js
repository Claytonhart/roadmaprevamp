import React, { useState } from 'react';
import styled from 'styled-components/macro';

import DropdownContainer from 'utils/DropdownContainer';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const Title = styled.h6`
  font-size: 14px;
  color: #fff;
  cursor: pointer;
`;

const IconContainer = styled.div`
  &:hover > span {
    opacity: 1;
  }
`;

const Icon = styled.span`
  cursor: pointer;
  opacity: 0;
`;
const DropDownButton = styled.button`
  cursor: pointer;
  padding: 8px 16px;
  background-color: #fff;
  text-align: right;
  display: block;
  border: none;
  background-color: transparent;
  width: 100%;
  color: #272838;

  &:hover {
    background-color: #f6f8f9;
    text-decoration: none;
    color: #272838;
  }
`;

const ProjectItemHeader = ({ title, editProject }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Container>
      <Title>{title}</Title>
      <IconContainer>
        <Icon id='item-icon' onClick={() => setShowDropdown(true)}>
          <i className='fas fa-ellipsis-h'></i>
        </Icon>
        {showDropdown && (
          <DropdownContainer callback={setShowDropdown} show={showDropdown}>
            <DropDownButton onClick={editProject}>
              Project settings
            </DropDownButton>
          </DropdownContainer>
        )}
      </IconContainer>
    </Container>
  );
};

export default ProjectItemHeader;
