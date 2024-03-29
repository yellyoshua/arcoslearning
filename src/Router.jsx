// @ts-check
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { verifyUserSession } from 'flux/actions';
import Header from './components/Header';
import { Authentication } from 'components/Authentication';

import Home from './pages/Home';
import Register from './pages/Register';
import Result from './pages/Result';

const PrivateHome = () => (
	<Authentication>
		<Home />
	</Authentication>
);

export const RouterComponent = () => {
	useEffect(() => {
		verifyUserSession();
	}, []);

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/'>
					<Route index element={<PrivateHome />} />
				</Route>
				<Route path='/register' element={<Register />} />
				<Route path='/scores' element={<Result />} />
			</Routes>
		</BrowserRouter>
	);
};
