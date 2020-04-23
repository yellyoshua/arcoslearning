import React from 'react';
import {Link} from 'react-router-dom';
import {arrowDown} from '../icons';
import useLocalState from '../store';

export default () => {
  const [localStore, localActions] = useLocalState();
  const closeSession = () => {
    localActions.removeUser();
  };
  return (
    <nav className="bg-transparent justify-content-center align-items-center navbar navbar-light bg-light">
      <a
        style={{fontSize: 35, textShadow: '1px 1px #279deb'}}
        className={localStore.user ? 'text-white d-flex align-items-center navbar-brand' : 'm-auto text-white d-flex align-items-center navbar-brand'}
        href="/"
      >
        <img src={arrowDown} width="64" height="64" className="d-inline-block align-top mx-3" alt="" />
        Arcos Learning
      </a>
      {localStore.played ? (
        <Link to={'/played'} style={{fontSize: 20, textShadow: '1px 1px rgb(84, 20, 20) 1px 1px'}} className="text-danger d-flex align-items-center navbar-brand pt-3 px-2">
          Mis juegos
        </Link>
      ) : null}

      {localStore.user ? (
        <button onClick={closeSession} className="btn btn-danger">
          Cerrar sessi&oacute;n
        </button>
      ) : null}
    </nav>
  );
};
