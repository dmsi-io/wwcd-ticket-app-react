import React from 'react';
import { get } from 'dot-prop';
import Lozenge from '@atlaskit/lozenge';

import './Header.scss';

export default (props) => (
  <div className="user-header">
    <h1>Welcome,<br />{props.userInfo.firstName}!</h1>
    <div className="spacer" />
    <div className="user-counter">
      <Lozenge>
        Tickets Remaining
      </Lozenge>
      <h3>{get(props.userInfo, 'tickets.remaining')}</h3>
    </div>
  </div>
);
