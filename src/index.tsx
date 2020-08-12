import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import { configure } from 'axios-hooks';

import './index.css';
import { App } from './App';

configure({
  axios: axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 30 * 1000,
    withCredentials: true,
  })
});

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
