import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import AppContextProvider from 'store';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
