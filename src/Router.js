import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import useLocalState from './store';
import Header from './components/Header';
import Register from './components/Register';
import Home from './components/Home';
import Result from './components/Result';
import './App.css';

function RouterComponent() {
  const [localStore] = useLocalState();
  useEffect(() => {
    console.log('usereffect -> ', localStore);
  });

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
            console.log('/played -> ', localStore);
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
