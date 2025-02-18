/* eslint-disable */
import storage from './storage';
import { USER_LOGOUT } from '../redux/modules/userLogout';
import store from '../redux/store';
import history from './history';

const getToken = () => {
  const token = storage.get('token');
  return `Bearer ${token}`;
};

const BASE_URL = 'https://wwcdapi-lre7slnnqq-uc.a.run.app/v1';

const api = {
  get: (route, authNeeded) => {
    const url = `${BASE_URL}${route}`;

    const headers = {
      authorization: authNeeded ? getToken() : undefined,
      cache: 'no-cache, no-store, must-revalidate',
    };

    return fetch(url, { headers })
      .then((data) => data.json())
      .then((data) => {
        if (data.errors) {
          if (data.errors[0].code === 'UserExpiredError') {
            store.dispatch({ type: USER_LOGOUT });
            history.push('/');
          }

          return [data];
        }

        return [undefined, data];
      });
  },
  post: (route, body, authNeeded) => {
    const url = `${BASE_URL}${route}`;

    const contentType = 'application/json';
    const cacheControl = 'no-cache, no-store, must-revalidate';

    const headers = authNeeded
      ? {
          authorization: getToken(),
          'content-type': contentType,
          'cache-control': cacheControl,
        }
      : {
          'content-type': contentType,
          'cache-control': cacheControl,
        };

    return fetch(url, {
      body: JSON.stringify(body),
      headers,
      method: 'POST',
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.errors) {
          if (data.errors[0].code === 'UserExpiredError') {
            store.dispatch({ type: USER_LOGOUT });
            history.push('/');
          }

          return [data];
        }

        return [undefined, data];
      });
  },
};

export default api;
