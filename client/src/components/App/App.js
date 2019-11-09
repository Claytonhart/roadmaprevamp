import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components/macro';

import Project from '../Project';
import * as ROUTES from '../../constants/routes';
import withAuthentication from '../Session/withAuthentication';
import Register from 'views/Register';
import Login from 'views/Login';

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
          {/* <Route exact path={ROUTES.LANDING} component={Landing} /> */}
          {/* <Route exact path={ROUTES.PROJECT_LIST} component={ProjectList} /> */}
          <Route exact path={ROUTES.PROJECT} component={Project} />
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.REGISTER} component={Register} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default withAuthentication(App);
