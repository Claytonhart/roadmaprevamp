import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

// import ProjectLink from './ProjectLink';

import DropdownContainer from '../../../utils/DropdownContainer';

import {
  Container,
  WorkspaceItemTitleContainer,
  WorkspaceItemTitle,
  WorkspaceItemPeople,
  WorkspaceItemProjects,
  WorkspaceItemIconContainer,
  WorkspaceItemIcon,
  WorkspaceItemPerson,
  DropDownContainerButton,
  Item,
  ItemContent,
  ItemIcon,
  ItemName,
  ItemEditIcon,
  ItemLink,
  ItemButton
} from '../style';

// import {
//   Item,
//   ItemContent,
//   ItemIcon,
//   ItemName,
//   ItemEditIcon,
//   ItemLink,
//   ItemButton
// } from './style';

// import EditProjectModal from './createProject/EditProjectModal';

const ProjectItem = ({ index, title, id, users }) => {
  const [people, setPeople] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);

  const [showEditProjectModal, setShowEditProjectModal] = useState(false);

  useEffect(() => {
    // debugger;
    const getUsers = async () => {
      const res = await axios.get(`/api/project/${id}/users`);
      const tempUsers = res.data;
      const threeUsers = tempUsers.slice(0, 3);
      // debugger;
      setPeople(threeUsers);
    };
    getUsers();
  }, [id, users]);

  const editProject = () => {
    setShowEditProjectModal(true);
  };

  return (
    <>
      <Container>
        <WorkspaceItemTitleContainer>
          <WorkspaceItemTitle>{title}</WorkspaceItemTitle>
          <WorkspaceItemIconContainer>
            <WorkspaceItemIcon
              id='item-icon'
              onClick={() => setShowDropdown(true)}
            >
              <i className='fas fa-ellipsis-h'></i>
            </WorkspaceItemIcon>
            {showDropdown && (
              <DropdownContainer callback={setShowDropdown} show={showDropdown}>
                <DropDownContainerButton onClick={editProject}>
                  Project settings
                </DropDownContainerButton>
                {/* <DropDownContainerButton onClick={createProject}>
                  Create new project
                </DropDownContainerButton> */}
              </DropdownContainer>
            )}
          </WorkspaceItemIconContainer>
        </WorkspaceItemTitleContainer>
        <WorkspaceItemPeople>
          {people &&
            people.map((person, i) => {
              if (!person) {
                return null;
              }

              return (
                <WorkspaceItemPerson
                  style={{ backgroundColor: person.color }}
                  key={i}
                >
                  {/* {person.name} */}
                  {person.name.substring(0, 2)}
                </WorkspaceItemPerson>
              );
            })}
        </WorkspaceItemPeople>
        <WorkspaceItemProjects>
          {/* object with .color and .name */}
          <ProjectLink
            projectId={id}
            project={{ color: 'lightblue', name: 'Board' }}
          />
          <ProjectLink
            onClick={editProject}
            project={{ color: 'pink', name: 'Project Details' }}
          />
          {/* {projects.map((project, i) => (
            // project.name, .link, .color, .abilitytodelete
            <ProjectItem key={i} project={project} />
          ))} */}
        </WorkspaceItemProjects>
      </Container>
      {/* {showEditProjectModal && (
        <EditProjectModal
          index={index}
          projectId={id}
          projectName={title}
          isVisible={showEditProjectModal}
          title={'Project details'}
          onClose={() => setShowEditProjectModal(false)}
        />
      )} */}
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  users: state.projects[ownProps.index].users
});

export default withRouter(connect(mapStateToProps)(ProjectItem));

const ProjectLink = ({ projectId, project, onClick }) => {
  return projectId ? (
    <Item>
      <ItemLink to={`/project/${projectId}`}>
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
