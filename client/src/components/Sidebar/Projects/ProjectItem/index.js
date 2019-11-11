import React, { useState } from 'react';

import EditProjectModal from 'components/EditProjectModal';
import ProjectItemHeader from './ProjectItemHeader';
import ProjectItemUsers from './ProjectItemUsers';
import ProjectItemLinks from './ProjectItemLinks';
import { Container } from './style';

const ProjectItem = ({ index, title, id }) => {
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);

  const editProject = () => {
    setShowEditProjectModal(true);
  };

  return (
    <Container>
      <ProjectItemHeader title={title} editProject={editProject} />
      <ProjectItemUsers id={id} index={index} />
      <ProjectItemLinks id={id} editProject={editProject} />

      {showEditProjectModal && (
        <EditProjectModal
          index={index}
          projectId={id}
          projectName={title}
          isVisible={showEditProjectModal}
          title={'Project details'}
          onClose={() => setShowEditProjectModal(false)}
        />
      )}
    </Container>
  );
};

export default ProjectItem;
