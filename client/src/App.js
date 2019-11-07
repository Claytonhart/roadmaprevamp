import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Project from './components/Project';

function App() {
  return (
    <Provider store={store}>
      <Project />
    </Provider>
  );
}

export default App;
