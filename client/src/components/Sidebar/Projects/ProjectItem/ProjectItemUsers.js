import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components/macro';

const UsersList = styled.ul`
  display: flex;
  margin: 12px 0;
`;

const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 11px;
  text-transform: uppercase;

  height: 24px;
  width: 24px;
  margin: 0;
  margin-right: 8px;
  padding: 6px;
  border-radius: 50%;
  background-color: ${props => props.theme.primary.lightgrey};
  cursor: pointer;
`;

const ProjectItemUsers = ({ id, index, users }) => {
  const [people, setPeople] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(`/api/project/${id}/users`);
      const tempUsers = res.data;
      const threeUsers = tempUsers.slice(0, 3);
      setPeople(threeUsers);
    };
    getUsers();
  }, [id, users]);

  return (
    <UsersList>
      {people &&
        people.map((person, i) => {
          if (!person) {
            return null;
          }

          return (
            <User style={{ backgroundColor: person.color }} key={i}>
              {person.name.substring(0, 2)}
            </User>
          );
        })}
    </UsersList>
  );
};

const mapStateToProps = (state, ownProps) => ({
  users: state.projects[ownProps.index].users
});

export default connect(mapStateToProps)(ProjectItemUsers);
