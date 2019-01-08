import { combineReducers } from 'redux';

import categories from './categories';
import prizes from './prizes';
import userInfo from './userInfo';
import { USER_LOGOUT } from './userLogout';

const appReducer = combineReducers({
  categories,
  prizes,
  userInfo,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined; // eslint-disable-line no-param-reassign
  }

  return appReducer(state, action);
};

export default rootReducer;
