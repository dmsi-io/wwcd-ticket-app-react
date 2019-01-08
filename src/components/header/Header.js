import React from 'react';
import { get } from 'dot-prop';
import Lozenge from '@atlaskit/lozenge';

import api from '../../utils/api';

import './Header.scss';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    api.get('/users/me', true).then(([err, { data }]) => {
      this.setState({ ...data.attributes });
    });
  }

  render() {
    return (
      <div className="user-header">
        <h1>Welcome,<br />{this.state.firstName}!</h1>
        <div className="spacer" />
        <div className="user-counter">
          <Lozenge>
            Tickets Remaining
          </Lozenge>
          <h3>{get(this.state, 'tickets.remaining')}</h3>
        </div>
      </div>
    )
  }
}
