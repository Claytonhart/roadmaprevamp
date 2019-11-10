import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { deleteColumn } from '../../actions/board';
import DropdownContainer from '../../utils/DropdownContainer';
import {
  Title,
  ColumnTitleIconContainer,
  ColumnTitleDelete,
  ColumnRight
} from './style';

const ColumnTitleDisplay = ({
  column,
  provided,
  setIsSelected,
  deleteColumn
}) => {
  const { title } = column;
  let { projectId } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);

  const showDropdownMenu = e => {
    e.stopPropagation();
    setShowDropdown(true);
  };

  return (
    <Title {...provided.dragHandleProps} onClick={() => setIsSelected(true)}>
      {title}
      <ColumnRight>
        <ColumnTitleIconContainer onClick={showDropdownMenu}>
          <i className='fas fa-ellipsis-h'></i>
        </ColumnTitleIconContainer>
        {showDropdown && (
          <DropdownContainer
            callback={setShowDropdown}
            show={showDropdown}
            left={'20px'}
            top={'0px'}
          >
            <ColumnTitleDelete onClick={() => deleteColumn(projectId, column)}>
              Delete Column
            </ColumnTitleDelete>
          </DropdownContainer>
        )}
      </ColumnRight>
    </Title>
  );
};

export default connect(
  null,
  { deleteColumn }
)(ColumnTitleDisplay);
