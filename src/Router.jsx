import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppContext } from './store';
import Header from './components/Header';
import Register from './components/Register';
import Home from './components/Home';
import Result from './components/Result';

function RouterComponent() {
  const [app] = useContext(AppContext);

  return (
    <Router>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => {
            if (app.user && app.avatar) {
              return <Home {...props} />;
            }
            return <Register {...props} />;
          }}
        />
        <Route
          exact
          path="/scores"
          render={(props) => {
            if (app.scores) {
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
