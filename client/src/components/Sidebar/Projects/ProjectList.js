import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getCurrentUsersProjects } from 'actions/projects';
import ProjectItem from './ProjectItem';

const ProjectList = ({ projects, getCurrentUsersProjects }) => {
  useEffect(() => {
    getCurrentUsersProjects();
  }, [getCurrentUsersProjects]);

  return (
    <div>
      {projects.map((project, index) => {
        const { _id: id, name } = project;
        return <ProjectItem index={index} key={id} title={name} id={id} />;
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  projects: state.projects
});

export default connect(
  mapStateToProps,
  { getCurrentUsersProjects }
)(ProjectList);
