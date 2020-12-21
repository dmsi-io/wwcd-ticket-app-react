/* eslint-disable */
const PREFIX = 'dmsiparty';

const storage = {
  length: () => window.localStorage.length,
  set: (key, value) => window.localStorage.setItem(`${PREFIX}:${key}`, value),
  get: (key) => window.localStorage.getItem(`${PREFIX}:${key}`),
  remove: (key) => window.localStorage.removeItem(`${PREFIX}:${key}`),
};

export default storage;
