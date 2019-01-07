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
    api.get('/categories').then(([err, {data}]) => {
      this.setState({categories: data});
    });
    api.get('/prizes').then(([err, { data }]) => {
      this.setState({ prizes: data });
    });
  }

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
              <PrivateRoute
                path="/prizes/categories"
                exact
                component={(props) => (
                  <Prizes
                    {...props}
                    categories={this.state.categories}
                    prizes={this.state.prizes}
                  />
                )}
              />
              <PrivateRoute
                path="/prizes"
                exact
                component={(props) => (
                  <Prizes
                    {...props}
                    categories={this.state.categories}
                    prizes={this.state.prizes}
                  />
                )}
              />
              <PrivateRoute
                path="/prizes/me"
                exact
                component={(props) => (
                  <Prizes
                    {...props}
                    categories={this.state.categories}
                    prizes={this.state.prizes}
                  />
                )}
              />
              <PrivateRoute
                path="/prizes/categories/:id?"
                exact
                component={(props) => (
                  <Prizes
                    {...props}
                    categories={this.state.categories}
                    prizes={this.state.prizes}
                  />
                )}
              />
              <Route render={() => (<Redirect to={{ pathname: '/prizes/categories' }} />)} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
