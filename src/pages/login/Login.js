import React from 'react';
import {
  Card,
  Input,
  Button,
  Alert,
  Loading,
} from '@wedgekit/core';
import { Text, Title } from '@wedgekit/primitives';
import Form, { Field } from '@wedgekit/form';
import Layout from '@wedgekit/layout';

import api from '../../utils/api';
import storage from '../../utils/storage';
import history from '../../utils/history';

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

  login = async ({ username, password }) => {
    const data = {
      attributes: {
        username: username.toLowerCase(),
        password,
      }
    };

    const [err, tokenData] = await api.post('/authenticate', { data });

    if (err) {
      this.setState({
        errors: err.errors,
      });
    } else {
      storage.remove('stateTree');
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
      <Layout.Grid
        columns={['minmax(0, max-content)']}
        rows={['minmax(0, max-content)']}
        areas={[]}
        justify="center"
        align="center"
      >
        {
          this.state.loading &&
            <Loading />
        }
        <Card style={{ marginTop: '30vh', maxWidth: '300px' }}>
          <Form onSubmit={this.login}>
            {({ formProps }) => (
              <form {...formProps}>
                <Layout.Grid columns={[1]} areas={[]} multiplier={2}>
                  {
                    this.state.errors.map((error) => (
                      <Alert
                        key={error.detail}
                        onClose={this.onApiErrorClose}
                      >
                        {error.detail}
                      </Alert>
                    ))
                  }
                  <Title level={2} elementLevel={2}>Login</Title>
                  <Text>Don't have your login credentials? See Tanya for your card.</Text>
                  <Field
                    label="Username"
                    required
                    defaultValue=""
                    name="username"
                  >
                    {({ fieldProps }) => (
                      <Input fullWidth {...fieldProps} />
                    )}
                  </Field>
                  <Field
                    label="Password"
                    required
                    defaultValue=""
                    name="password"
                  >
                    {({ fieldProps }) => (
                      <Input fullWidth elementType="password" {...fieldProps} />
                    )}
                  </Field>
                  <Layout.Grid columns={['minmax(0, max-content)']} areas={[]} justify="end">
                    <Button domain="primary" type="submit">Login</Button>
                  </Layout.Grid>
                </Layout.Grid>
              </form>
            )}
          </Form>
        </Card>
      </Layout.Grid>
    );
  }
}
