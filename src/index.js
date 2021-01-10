import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './history';
import GlobalStyle from './globalStyles';

import App from './App';

ReactDOM.render(
  <Router history={history}>
    <GlobalStyle />
    <App />
  </Router>,
  document.getElementById('root')
);
