import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components/macro';

import store from '../../store';
import { loadUser } from '../../actions/auth';
import setAuthToken from '../../utils/setAuthToken';
import Project from '../Project';
import Login from '../../views/Login';
import * as ROUTES from '../../constants/routes';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container>
          <Switch>
            <Route exact path={ROUTES.LANDING} component={Project} />
            <Route exact path={ROUTES.LOGIN} component={Login} />
          </Switch>
        </Container>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
