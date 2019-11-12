import React, { useState } from 'react';

import AddColumnInput from './AddColumnInput';

import { Container, NewColumnTitle, NewColumnTitleContainer } from './style';

const AddColumn = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    // onClick={createColumn}
    <Container>
      <NewColumnTitleContainer onClick={() => setIsSelected(true)}>
        {!isSelected ? (
          <NewColumnTitle>&#43; Add new column</NewColumnTitle>
        ) : (
          <AddColumnInput setIsSelected={setIsSelected} />
        )}
      </NewColumnTitleContainer>
    </Container>
  );
};

export default AddColumn;
