import React from 'react';
import Layout from '@wedgekit/layout';
import primitives, { Title } from '@wedgekit/primitives';
import styled from 'styled-components';
import { Wedge } from '@wedgekit/illustrations';
import { IconWidth } from '@wedgekit/icons';
import color from '@wedgekit/color';
import history from '../../utils/history';
import qs from 'qs';

const UserHeader = styled(Layout.Grid)`
  font-family: ${primitives.fontFamily};
  margin: 24px 0;
`;

const Header = (props) => {
  return (
    <UserHeader
      areas={[]}
      columns={['minmax(0, max-content)', 1, 'minmax(0, max-content)']}
      align="start"
      multiplier={3}
    >
      <IconWidth iconWidth={32}>
        <Wedge />
      </IconWidth>
      <Title level={1} elementLevel={1}>
        Happy Holidays from DMSi, {props.userInfo.firstName}!
      </Title>
    </UserHeader>
  );
};

export default Header;
