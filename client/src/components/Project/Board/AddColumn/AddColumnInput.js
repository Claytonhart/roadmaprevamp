import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { createNewColumn } from '../../../../actions/board';
import onEscOrClickOutside from 'utils/onEscOrClickOutside';
import { NewColumnForm, NewColumnFormInput } from './style';

const AddColumnInput = ({ setIsSelected, createNewColumn }) => {
  let { projectId } = useParams();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const element = document.getElementById('new-column-input');
    const cleanup = onEscOrClickOutside(setIsSelected, element);

    return () => {
      cleanup();
    };
  }, [setIsSelected]);

  const onNewColumnSubmit = e => {
    e.preventDefault();
    createNewColumn(projectId, inputValue);
    setIsSelected(false);
  };

  return (
    <NewColumnForm onSubmit={onNewColumnSubmit}>
      <NewColumnFormInput
        id='new-column-input'
        type='text'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder='New Column'
        autoFocus
      ></NewColumnFormInput>
    </NewColumnForm>
  );
};

export default connect(
  null,
  { createNewColumn }
)(AddColumnInput);
