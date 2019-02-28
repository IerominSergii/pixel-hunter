export default (state, lives) => {
  if (typeof lives !== `number`) {
    throw new Error(`Wrong lives type, should be the number.`);
  }

  return Object.freeze(Object.assign({}, state, {lives}));
};
