import React from 'react';
import {
  Card,
  TextInput,
  Button,
  Alerts,
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
    }
  }

  handleFieldChange = (field) => (value) => {
    this.setState({ [field]: value });
  };

  login = async (e) => {
    e.preventDefault();

    const data = {
      attributes: {
        username: this.state.username,
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
      history.push('/prizes');
    }
  };

  onApiErrorClose = () => {
    this.setState({ errors: [] });
  };

  render() {
    return (
      <div className="login">
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
