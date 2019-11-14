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
      {/* map over projects object's project ids, and display a ProjectItem for each one */}
      {Object.keys(projects).map((projectId, index) => {
        const { _id: id, name } = projects[projectId];
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
