import React, { useState } from 'react';
import ColumnTitleDisplay from './ColumnTitleDisplay';
import ColumnTitleInput from './ColumnTitleInput';

import { ColumnTitleContainer } from './style';

const ColumnTitle = ({ column, provided }) => {
  const [isSelected, setIsSelected] = useState(false);

  const titleToRender = !isSelected ? (
    <ColumnTitleDisplay
      column={column}
      provided={provided}
      setIsSelected={setIsSelected}
    />
  ) : (
    <ColumnTitleInput column={column} setIsSelected={setIsSelected} />
  );

  return <ColumnTitleContainer>{titleToRender}</ColumnTitleContainer>;
};

export default ColumnTitle;
