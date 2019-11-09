import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { getBoardById } from '../../actions/board';
import Board from './Board';
import BoardLoading from './BoardLoading';

const BoardContainer = ({ getBoardById }) => {
  let history = useHistory();
  let { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBoard() {
      let tempId = await getBoardById(projectId);

      if (!tempId) {
        history.push('/project');
      }
    }
    fetchBoard().then(() => {
      setIsLoading(false);
    });
  }, [getBoardById, history, projectId]);

  return <>{!isLoading ? <Board /> : <BoardLoading />}</>;
};

export default connect(
  null,
  { getBoardById }
)(BoardContainer);
