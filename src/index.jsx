import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { RouterComponent } from './Router';
import AppContextProvider from 'store';
import 'react-toastify/dist/ReactToastify.min.css';
import 'dayjs/locale/es';
import './index.css';

dayjs.extend(localizedFormat);
dayjs.locale('es');

ReactDOM.render(
	<React.StrictMode>
		<AppContextProvider>
			<RouterComponent />
			<ToastContainer
				position='top-right'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</AppContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
