import React, { useState, Fragment, useContext } from 'react';
import { AppContext } from '../store';

const Register = () => {
  const [, actions] = useContext(AppContext);
  const [username, setUsername] = useState('');

  const startingGame = (event) => {
    event.preventDefault();
    actions.addUser(event.target.username.value);
  };

  const onInputChange = (event) => {
    if (event.target.value.toString().length >= 15) {
      return setUsername(event.target.value.toString().slice(0, 15));
    }
    return setUsername(event.target.value.toString());
  };

  return (
    <Fragment>
      <section className="container">
        <div style={{ maxWidth: 500 }} className="container-fluid text-center">
          <p className="init-greeting">Okey, comenzemos pero antes debo saber ¿Qui&eacute;n eres? ...</p>
          <strong style={{ fontSize: 14 }} className="text-danger">
            (M&aacute;ximo 15 car&aacute;cteres)
          </strong>
        </div>
        <form className="text-center col" onSubmit={startingGame}>
          <input onChange={onInputChange} placeholder="Tu nombre" className="col-ms-6" value={username} name="username" autoComplete="off" type="text" />
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
