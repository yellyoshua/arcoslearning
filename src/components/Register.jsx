// @ts-check
import React, { useState, Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { createUserSession } from 'flux/actions';
import { useUserStore } from 'flux/stores';
import { AvatarPicker } from './AvatarPicker';

const Register = () => {
  const { loading, user } = useUserStore();
  const [name, setName] = useState('');

  /** @param {React.ChangeEvent<HTMLFormElement>} event */
  const registerPlayer = (event) => {
    event.preventDefault();
    createUserSession(name);
  };

  /** @param {React.ChangeEvent<HTMLInputElement>} event */
  const handlerNameInput = (event) => {
    const name = event.target.value;

    if (name.length >= 15) {
      setName(name.slice(0, 15));
    } else {
      setName(name);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user && user.name && user.avatar) {
    return <Navigate to="/" />;
  }

  if (user?.name && !user.avatar) {
    return <AvatarPicker />;
  }

  return (
    <Fragment>
      <section className="container">
        <div style={{ maxWidth: 500 }} className="container-fluid text-center">
          <p className="init-greeting">Okey, comenzemos pero antes debo saber ¿Qui&eacute;n eres? ...</p>
          <strong style={{ fontSize: 14 }} className="text-danger">
            (M&aacute;ximo 15 car&aacute;cteres)
          </strong>
        </div>
        <form className="text-center col" onSubmit={registerPlayer}>
          <input type="text" onChange={handlerNameInput} value={name} placeholder="Tu nombre" className="col-ms-6" autoComplete="off" />
          <button type="submit" style={{ maxWidth: 200 }} className="col-ms-6 m-5 btn btn-danger">
            Comenzar
          </button>
        </form>
      </section>
      <section className="footer container">
        <blockquote className="blockquote text-center">
          <footer className="blockquote-footer">
            Por <cite title="Briggitte Arcos">Briggitte Arcos</cite>
          </footer>
        </blockquote>
      </section>
    </Fragment>
  );
};

export default Register;
