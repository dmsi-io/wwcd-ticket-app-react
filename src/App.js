import React from 'react';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Header } from '@dmsi/wedgekit';
import { get } from 'dot-prop';
import { Provider } from 'react-redux';

import store from './redux/store';

import storage from './utils/storage';
import history from './utils/history';
import api from './utils/api';

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
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      prizes: [],
    };
  }

  componentDidMount() {
    Promise.all([
      api.get('/categories'),
      api.get('/prizes'),
    ]).then(([ categories, prizes ]) => {
      this.setState({
        prizes: get(prizes, '1.data'),
        categories: get(categories, '1.data'),
      });
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="app">
            <Header
              collapsed
              tagline="Holiday Party"
            />
            <div className="content">
              <Switch>
                <Route path="/login" exact component={Login} />
                <PrivateRoute
                  path="/prizes"
                  exact
                  component={Prizes}
                />
                <Route render={() => (<Redirect to={{ pathname: '/prizes' }} />)} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
