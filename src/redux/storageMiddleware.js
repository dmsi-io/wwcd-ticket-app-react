export default (storage) => ({ getState }) => (next) => (action) => {
  const result = next(action);
  const localStateTree = Object.assign({}, getState());

  storage.set('stateTree', JSON.stringify(localStateTree));

  return result;
};