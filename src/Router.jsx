// @ts-check
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { verifyUserSession } from 'flux/actions';
import Header from './components/Header';
import Register from './components/Register';
import Home from './components/Home';
import Result from './components/Result';

export const RouterComponent = () => {
  useEffect(() => {
    verifyUserSession();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/scores" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
};
