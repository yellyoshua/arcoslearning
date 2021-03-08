import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { arrowDown } from '../icons';
import { AppContext } from '../store';
import Avatar from './Avatar';

export default function Header() {
  const [app, actions] = useContext(AppContext);

  const closeSession = () => {
    actions.removeUser();
  };

  return (
    <nav className="bg-transparent justify-content-around w-100 align-items-center navbar navbar-light bg-light">
      <a style={{ fontSize: 35, textShadow: '1px 1px #279deb' }} className={'text-white d-flex align-items-center navbar-brand'} href="/">
        <img src={arrowDown} width="64" height="64" className="d-inline-block align-top mx-3" alt="" />
        Arcos Learning
      </a>
      {app.scores.length > 0 ? (
        <Link to={'/scores'} style={{ fontSize: 20, textShadow: '1px 1px rgb(84, 20, 20) 1px 1px' }} className="text-danger d-flex align-items-center navbar-brand pt-3 px-2">
          Jugadas
        </Link>
      ) : null}

      {app.user ? (
        <button onClick={closeSession} className="btn btn-danger">
          Cerrar sessi&oacute;n
        </button>
      ) : null}

      <Avatar />
    </nav>
  );
}
