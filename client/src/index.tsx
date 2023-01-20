import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios'
import { BASE_URL } from './API/endpoints';
import { Provider } from 'react-redux';
import Store from './redux/store';

// default proxy for axios
axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider
    store={Store}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);