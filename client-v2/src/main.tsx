import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './navigation/Routes'
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs'
import { tailChase } from 'ldrs'
import 'react-toastify/dist/ReactToastify.min.css'
import 'dayjs/locale/es'
import './index.css'

dayjs.extend(localizedFormat);
dayjs.locale('es');

tailChase.register();

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
)
