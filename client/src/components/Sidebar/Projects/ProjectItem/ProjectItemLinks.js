import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

const LinksContainer = styled.ul`
  margin-bottom: 8px;
  text-align: left;
`;
const Item = styled.li`
  /*  */
`;

const ItemLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 6px;
  color: inherit;
  outline: none;

  transition: all 0.2s;

  &:hover,
  &:focus,
  &:active {
    background-color: ${props => props.theme.primary.lightgrey};
    text-decoration: none;
    color: inherit;
    outline: none;
  }

  &:hover {
    > span {
      opacity: 1;
    }
  }
`;

const ItemButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 6px;
  color: inherit;
  outline: none;

  transition: all 0.2s;

  &:hover,
  &:focus {
    background-color: ${props => props.theme.primary.lightgrey};
    text-decoration: none;
    color: inherit;
    outline: none;
  }

  &:hover {
    > span {
      opacity: 1;
    }
  }
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
`;

const ItemIcon = styled.span`
  width: 8px;
  height: 8px;
  margin-right: 12px;
  background-color: ${props =>
    props.color ? props.color : props.theme.primary.lightgrey};
`;

const ItemName = styled.p`
  margin: 0;
`;

const ItemEditIcon = styled.span`
  cursor: pointer;
  opacity: 0;
  font-size: 18px;
`;

const ProjectLink = ({ projectId, project, onClick }) => {
  return projectId ? (
    <Item>
      <ItemLink to={`/projects/${projectId}`}>
        <ItemContent>
          <ItemIcon color={project.color}></ItemIcon>
          <ItemName>{project.name}</ItemName>
        </ItemContent>
        <ItemEditIcon>
          <i className='fas fa-long-arrow-alt-right'></i>
        </ItemEditIcon>
      </ItemLink>
    </Item>
  ) : (
    <Item onClick={onClick}>
      <ItemButton>
        <ItemContent>
          <ItemIcon color={project.color}></ItemIcon>
          <ItemName>{project.name}</ItemName>
        </ItemContent>
        <ItemEditIcon>
          <i className='fas fa-long-arrow-alt-right'></i>
        </ItemEditIcon>
      </ItemButton>
    </Item>
  );
};

const ProjectItemLinks = ({ id, editProject }) => {
  return (
    <LinksContainer>
      {/* object with .color and .name */}
      <ProjectLink
        projectId={id}
        project={{ color: 'lightblue', name: 'Board' }}
      />
      <ProjectLink
        onClick={editProject}
        project={{ color: 'pink', name: 'Project Details' }}
      />
    </LinksContainer>
  );
};

export default ProjectItemLinks;
