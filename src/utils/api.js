import storage from './storage';

const getToken = () => {
  const token = storage.get('token');
  return `Bearer ${token}`;
};

export default {
  get: (route, authNeeded) => {
    const url = `https://dmsiparty.com/v1${route}`;

    const headers = authNeeded ?
      { authorization: getToken() } :
      {};

    return fetch(url, { headers })
      .then((data) => data.json())
      .then((data) => {
        if (data.errors) {
          return [data];
        }

        return [undefined, data];
      });
  },
  post: (route, body, authNeeded) => {
    const url = `https://dmsiparty/v1${route}`;

    const contentType = 'application/json';

    const headers = authNeeded ?
      {
        authorization: getToken(),
        'content-type': contentType,
      } :
      { 'content-type': contentType };

    return fetch(url, {
      body: JSON.stringify(body),
      headers,
      method: 'POST',
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.errors) {
          return [data];
        }

        return [undefined, data];
      });
  },
}