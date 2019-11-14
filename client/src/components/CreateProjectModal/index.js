import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createNewProject } from 'actions/projects';
import { setError } from 'actions/error';

import {
  Modal,
  ModalDialog,
  ModalHeader,
  ModalTitle,
  ModalInputDesc,
  // ModalInputPeople,
  ModalClose,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalFooterButton,
  ModalForm,
  ModalError
} from './style';

const CreateProjectModal = ({
  isVisible = false,
  title,
  content,
  footer,
  onClose,
  history,
  createNewProject,
  setShouldUpdate,
  setError,
  error
}) => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    projectDesc: ''
  });

  const { projectTitle, projectDesc } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    const keydownHandler = ({ key }) => {
      switch (key) {
        case 'Escape':
          onClose();
          break;
        default:
      }
    };

    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  }, [onClose]);

  const onFormSubmit = async e => {
    e.preventDefault();

    if (!projectTitle) {
      setError('Please add a project title');
      // setAlert('Please add a project title', 'red');
      console.log('please add a project title');
    } else {
      setShouldUpdate(false);
      const id = await createNewProject(projectTitle);
      onClose();
      history.push(`/projects/${id}`);
    }
  };

  return !isVisible ? null : (
    <Modal onMouseDown={onClose}>
      <ModalDialog onMouseDown={e => e.stopPropagation()}>
        <ModalHeader>
          {title}
          <ModalClose onMouseDown={onClose}>&times;</ModalClose>
        </ModalHeader>
        <ModalBody>
          <ModalContent>
            <ModalForm onSubmit={e => onFormSubmit(e)}>
              {error.msg && <ModalError>{error.msg}</ModalError>}
              <label>Project Title</label>
              <ModalTitle
                type='text'
                name='projectTitle'
                value={projectTitle}
                onChange={e => onChange(e)}
                required
              />
              <label>Project Description</label>
              <ModalInputDesc
                type='text'
                name='projectDesc'
                value={projectDesc}
                onChange={e => onChange(e)}
              />
              {/* <ModalInputPeople>Add people to the project</ModalInputPeople> */}
              <ModalFooterButton onClick={onFormSubmit}>
                Create Your New Project
              </ModalFooterButton>
            </ModalForm>
            {content}
          </ModalContent>
        </ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalDialog>
    </Modal>
  );
};

const mapStateToProps = state => ({
  error: state.error
});

export default withRouter(
  connect(
    mapStateToProps,
    { createNewProject, setError }
  )(CreateProjectModal)
);
