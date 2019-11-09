import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components/macro';

import store from './store';
import { theme, GlobalStyle } from './styles';
import App from './components/App/App';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
