import React from 'react';
import ReactDOM from 'react-dom';
import { RouterComponent } from './Router';
import AppContextProvider from 'store';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterComponent />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
