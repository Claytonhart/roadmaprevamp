import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Project from './components/Project';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Project />
    </Provider>
  );
};

export default App;
