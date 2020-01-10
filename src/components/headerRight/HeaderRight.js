import React from 'react';
import { Dropdown } from '@wedgekit/core';

import { USER_LOGOUT } from '../../redux/modules/userLogout';
import store from '../../redux/store';
import api from '../../utils/api';

const logout = () => {
  store.dispatch({ type: USER_LOGOUT });
  window.location.href = '/';
};

const refresh = async ({
   setUserInfo,
   setPrizes,
   setCategories,
   setUserPrizes,
 }) => {
  const [prizes, userInfo, categories, userPrizes] = await Promise.all([
    api.get('/prizes').then(([err, { data }]) => data),
    api.get('/users/me', true).then(([err, { data }]) => data),
    api.get('/categories', true).then(([err, { data }]) => data),
    api.get('/users/me/prizes', true).then(([err,  { data }]) => data),
  ]);

  setUserInfo(userInfo.attributes);
  setPrizes(prizes);
  setCategories(categories);
  setUserPrizes(userPrizes);
};

export default (props) => (
  <Dropdown
    label="Settings"
    options={[
      { id: 'refresh', display: 'Refresh Data' },
      { id: 'logout', display: 'Logout' },
    ]}
    subtle
    onSelect={(s) => {
      if (s === 'logout') {
        logout();
      } else if (s === 'refresh') {
        refresh(props);
      }
    }}
  />
)
