import React from 'react';

import ProjectHeader from './ProjectHeader';
import ProjectList from './ProjectList';

import { ProjectsContainer } from './style';

const Projects = () => {
  return (
    <ProjectsContainer>
      <ProjectHeader />
      <ProjectList />
    </ProjectsContainer>
  );
};

export default Projects;
