import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import styled from 'styled-components';
import axios from 'axios';

import { addUserToProject } from 'actions/projects';

const UserInputSearch = styled(DebounceInput)`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #dbdbdb;
`;

const UsersElement = styled.li`
  padding: 8px 0;
  text-transform: capitalize;
`;

const UsersIcon = styled.span`
  margin-right: 10px;
  cursor: pointer;
`;

const UsersSearch = ({ id, addUserToProject }) => {
  const [users, setUsers] = useState([]);

  const searchForUsers = async e => {
    if (e.target.value) {
      const res = await axios.get(`/api/users/name/${e.target.value}`);
      setUsers(res.data);
    } else {
      setUsers([]);
    }
  };

  const addUser = async i => {
    const userId = users[i]._id;
    await addUserToProject(id, userId);
  };

  return (
    <div>
      {/* <form onSubmit={onFormSubmit}> */}
      <UserInputSearch
        minLength={2}
        debounceTimeout={400}
        onChange={e => searchForUsers(e)}
        placeholder='search users'
      />
      {users.length > 0 && (
        <ul>
          {users.map((user, i) => (
            <UsersElement key={user._id}>
              <p>
                <UsersIcon onClick={() => addUser(i)}>
                  <i className='fas fa-plus'></i>
                </UsersIcon>
                {user.name}
              </p>
            </UsersElement>
          ))}
        </ul>
      )}
      {/* </form> */}
    </div>
  );
};

export default connect(
  null,
  { addUserToProject }
)(UsersSearch);
