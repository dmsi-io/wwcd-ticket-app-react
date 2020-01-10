import React from 'react';
import { get } from 'dot-prop';
import Lozenge from '@atlaskit/lozenge';
import Layout from '@wedgekit/layout';
import primitives, { Title } from '@wedgekit/primitives';
import styled from 'styled-components';

const UserHeader = styled(Layout.Grid)`
  font-family: ${primitives.fontFamily};
`;

export default (props) => (
  <UserHeader areas={[]} columns={[1, 'minmax(0, max-content)']} align="center">
    <Title level={1} elementLevel={1}>Welcome,<br />{props.userInfo.firstName}!</Title>
    <div className="user-counter">
      <Lozenge>
        Tickets Remaining
      </Lozenge>
      <Title style={{ fontSize: '50px', textAlign: 'center' }} level={1} elementLevel={3}>{get(props.userInfo, 'tickets.remaining')}</Title>
    </div>
  </UserHeader>
);
