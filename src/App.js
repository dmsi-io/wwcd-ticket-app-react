import React from 'react';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import storage from './utils/storage';
import history from './utils/history';
import poll from './utils/poll';
import api from './utils/api';
import { setUserInfo } from './redux/modules/userInfo';

import {
  Prizes,
  Login,
} from './pages';

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
  componentDidMount() {
    poll(store);

    if (storage.get('token')) {
      // Ensure that user still exists
      api.get('/users/me', true)
        .then(([err, data]) => data.data.attributes)
        .then((data) => store.dispatch(setUserInfo(data)));
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/login" exact component={Login} />
            <PrivateRoute
              path="/prizes"
              exact
              component={Prizes}
            />
            <Route render={() => (<Redirect to={{ pathname: '/prizes' }} />)} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
