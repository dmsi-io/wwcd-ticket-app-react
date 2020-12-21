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
  cursor: pointer;
  width: max-content;
`;

const Header = (props) => {
  const openPrize = (prizeId) => {
    const params = qs.parse(history.location.search.replace('?', ''));
    return history.push(`/prizes?${qs.stringify({
      ...params,
      prizeId,
    })}`);
  };

  return (
    <UserHeader areas={[]} columns={['minmax(0, max-content)', 1, 'minmax(0, max-content)']} align="start" multiplier={3}>
      <IconWidth iconWidth={32}>
        <Wedge />
      </IconWidth>
      <Title level={1} elementLevel={1}>Happy Holidays from DMSi, {props.userInfo.firstName}!</Title>
      {
        !!props.selectedGift && !props.selectedGift.confirmed && props.userInfo.tickets.remaining !== 0 &&
        <FAB onClick={() => openPrize(props.selectedGift.id)}>Confirm Your Choice</FAB>
      }
    </UserHeader>
  );
};

export default Header;
