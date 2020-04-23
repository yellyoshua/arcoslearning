import React from 'react';
import useLocalState from '../store';

const Register = () => {
  const localState = useLocalState();
  const localActions = localState[1];
  const startingGame = (event) => {
    event.preventDefault();
    localActions.addUser(event.target.username.value);
  };
  return (
    <section className="container">
      <div className="container-fluid">
        <p className="init-greeting">Okey, comenzemos pero antes debo saber como te llamas ...</p>
      </div>
      <form className="text-center col" onSubmit={startingGame}>
        <input placeholder="Tu nombre" className="col-ms-6" name="username" autoComplete="off" type="text" />
        <button type="submit" style={{maxWidth: 200}} className="col-ms-6 m-5 btn btn-danger">
          Comenzar
        </button>
      </form>
    </section>
  );
};

export default Register;
