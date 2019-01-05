import React from 'react';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  Header
} from '@dmsi/wedgekit';

import storage from './utils/storage';
import history from './utils/history';

import {
  Prizes,
  Login,
} from './pages';

import '@dmsi/wedgekit/dist/wedgekit.css';
import './App.scss';

const PrivateRoute = ({ component: Component, ...routeProps }) => (
  <Route
    {...routeProps}
    render={(props) => (
      storage.get('token') ?
        <Component {...props} /> :
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
    )}
  />
);

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div className="app">
          <Header
            collapsed
            tagline="Holiday Party"
          />
          <div className="content">
            <Switch>
              <Route path="/login" exact component={Login} />
              <PrivateRoute path="/prizes/categories" exact component={Prizes} />
              <PrivateRoute path="/prizes" exact component={Prizes} />
              <PrivateRoute path="/prizes/me" exact component={Prizes} />
              <PrivateRoute path="/prizes/categories/:id?" exact component={Prizes} />
              <Route render={() => (<Redirect to={{ pathname: '/prizes/categories' }} />)} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
