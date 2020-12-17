import React from 'react';
import Layout from '@wedgekit/layout';
import primitives, { Title } from '@wedgekit/primitives';
import styled from 'styled-components';
import { Wedge } from '@wedgekit/illustrations';
import { IconWidth } from '@wedgekit/icons';
import color from '@wedgekit/color';

const UserHeader = styled(Layout.Grid)`
  font-family: ${primitives.fontFamily};
  margin: 24px 0;
`;

const FAB = styled.button`
  appearance: none;
  background: ${color.G500};
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  box-shadow: 0 6px 12px -1px rgba(0, 0, 0, 0.2);
  padding: 12px 24px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 600;
  position: relative;
  
  &::after {
    content: ${(props) => props.selected ? '"1"' : null};
    background: ${color.R500};
    color: ${color.N050};
    font-size: 12px;
    font-weight: 600;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    bottom: -8px;
    position: absolute;
    right: 12px;
  }
`;

export default (props) => (
  <UserHeader areas={[]} columns={['minmax(0, max-content)', 1, 'minmax(0, max-content)']} align="start" multiplier={3}>
    <IconWidth iconWidth={32}>
      <Wedge />
    </IconWidth>
    <Title level={1} elementLevel={1}>Happy Holidays from DMSi, {props.userInfo.firstName}!</Title>
    <FAB>Confirm Your Choice</FAB>
  </UserHeader>
);
