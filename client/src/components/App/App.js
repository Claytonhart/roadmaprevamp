import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components/macro';

import Project from '../Project';
import Login from '../../views/Login';
import * as ROUTES from '../../constants/routes';
import Register from 'src/views/Register';
import withAuthentication from '../Session/withAuthentication';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <Route exact path={ROUTES.LANDING} component={Project} />
          <Route exact path={ROUTES.PROJECTS} component={Project} />
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.REGISTER} component={Register} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default withAuthentication(App);
