const setLives = (state, lives) => {
  if (typeof lives !== `number`) {
    throw new Error(`Wrong lives type, should be the number.`);
  }

  // if (lives < 0) {
  //   throw new Error(`Lives should not be negative`);
  // }

  return Object.freeze(Object.assign({}, state, {lives}));
};

export default setLives;
