import React from 'react';
import { Button } from '@wedgekit/core';

import { USER_LOGOUT } from '../../redux/modules/userLogout';
import store from '../../redux/store';
import api from '../../utils/api';

const logout = () => {
  store.dispatch({ type: USER_LOGOUT });
  window.location.href = '/';
};

export const refresh =
  ({ setCategories, setPrizes, setUserInfo, setUserPrizes }) =>
  async () => {
    const [prizes, userInfo, categories, userPrizes] = await Promise.all([
      api.get('/prizes').then(([_, data]) => data),
      api.get('/users/me', true).then(([_, data]) => data),
      api.get('/categories', true).then(([_, data]) => data),
      api.get('/users/me/prizes', true).then(([_, data]) => data),
    ]);

    if (userInfo.data) setUserInfo(userInfo.data.attributes);
    if (prizes.data) setPrizes(prizes.data);
    if (categories.data) setCategories(categories.data);
    if (userPrizes.data) setUserPrizes(userPrizes.data);
  };

export default (props) => (
  <div style={{ display: 'flex', 'flex-direction': 'row' }}>
    <Button key="refresh" onClick={refresh(props)} domain="primary" style={{ 'margin-right': 10 }}>
      Refresh
    </Button>
    <Button key="logout" onClick={logout} domain="primary">
      Logout
    </Button>
  </div>
);
