export default (state) => {
  return Object.freeze(Object.assign({}, state, {isGameActive: false}));
};
