import React from 'react';
import {
  Card,
  TextInput,
  Button,
  Alerts,
  Loading,
  Header,
} from '@dmsi/wedgekit';

import api from '../../utils/api';
import storage from '../../utils/storage';
import history from '../../utils/history';

import './Login.scss';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: [],
      loading: false,
    }
  }

  handleFieldChange = (field) => (value) => {
    this.setState({ [field]: value });
  };

  login = async (e) => {
    e.preventDefault();

    const data = {
      attributes: {
        username: this.state.username.toLowerCase(),
        password: this.state.password,
      }
    };

    const [err, tokenData] = await api.post('/authenticate', { data });

    if (err) {
      this.setState({
        errors: err.errors,
      });
    } else {
      storage.set('token', tokenData.data.attributes.token);
      storage.set('userID', tokenData.data.id);

      this.setState({ loading: true });

      const [prizes, userInfo, categories, userPrizes] = await Promise.all([
        api.get('/prizes').then(([err, { data }]) => data),
        api.get('/users/me', true).then(([err, { data }]) => data),
        api.get('/categories', true).then(([err, { data }]) => data),
        api.get('/users/me/prizes', true).then(([err,  { data }]) => data),
      ]);

      this.props.setUserInfo(userInfo.attributes);
      this.props.setPrizes(prizes);
      this.props.setCategories(categories);
      this.props.setUserPrizes(userPrizes);

      this.setState({ loading: false });

      history.push('/prizes');
    }
  };

  onApiErrorClose = () => {
    this.setState({ errors: [] });
  };

  render() {
    return (
      <div className="login">
        <Header
          collapsed
          tagline="Holiday Party"
        />
        {
          this.state.loading &&
            <Loading />
        }
        <Card>
          <form onSubmit={this.login}>
            <div className="cardBody">
              {
                this.state.errors.length > 0 &&
                <Alerts
                  alerts={this.state.errors.map((error) => error.detail)}
                  onClose={this.onApiErrorClose}
                />
              }
              <h2>Login</h2>
              <p>Don't have your login credentials? See Tanya for your card.</p>
              <TextInput
                size="large"
                label="Username"
                value={this.state.username}
                onChange={this.handleFieldChange('username')}
                required
              />
              <TextInput
                size="large"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleFieldChange('password')}
                required
              />
            </div>
            <div className="cardFooter">
              <Button type="submit">Login</Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }
}
