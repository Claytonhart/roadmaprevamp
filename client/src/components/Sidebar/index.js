import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import Projects from './Projects';

const Container = styled.div`
  width: 244px;
  min-width: 244px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  background-color: ${props => props.theme.primary.grey};
  color: #fff;
  padding: 10px;
`;

const NavContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const NavTitle = styled.h3`
  display: block;
  color: inherit;
  text-decoration: underline;
  text-decoration-color: ${props => props.theme.primary.red};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 50px;

  &:hover {
    color: inherit;
    text-decoration-color: ${props => props.theme.primary.red};
  }
`;

const NavLinks = styled.div`
  margin-bottom: 10px;
  min-height: 100px;
`;

const NavFooter = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Sidebar = () => {
  return (
    <Container>
      <NavContainer>
        <NavTitle as={Link} to='/'>
          Roadmap
        </NavTitle>
        <NavLinks></NavLinks>
      </NavContainer>

      <Projects />

      <NavFooter>Roadmap 2019</NavFooter>
    </Container>
  );
};

export default Sidebar;
