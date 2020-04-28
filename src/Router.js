import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import useLocalState from './store';
import Header from './components/Header';
import Register from './components/Register';
import Home from './components/Home';
import Result from './components/Result';

function RouterComponent() {
  const [localStore] = useLocalState();

  return (
    <Router>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => {
            if (localStore.user) {
              return <Home {...props} />;
            }
            return <Register {...props} />;
          }}
        />
        <Route
          exact
          path="/played"
          render={(props) => {
            if (localStore.played) {
              return <Result {...props} />;
            }
            return props.history.push('/');
          }}
        />
      </Switch>
    </Router>
  );
}

export default RouterComponent;
