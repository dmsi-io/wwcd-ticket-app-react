import React from 'react';
import Layout from '@wedgekit/layout';
import primitives, { Title } from '@wedgekit/primitives';
import styled from 'styled-components';
import { Wedge } from '@wedgekit/illustrations';
import { IconWidth } from '@wedgekit/icons';

const UserHeader = styled(Layout.Grid)`
  font-family: ${primitives.fontFamily};
  margin: 24px 0;
`;

export default (props) => (
  <UserHeader areas={[]} columns={['minmax(0, max-content)', 1]} align="start" multiplier={3}>
    <IconWidth iconWidth={32}>
      <Wedge />
    </IconWidth>
    <Title level={1} elementLevel={1}>Happy Holidays from DMSi, {props.userInfo.firstName}!</Title>
  </UserHeader>
);
