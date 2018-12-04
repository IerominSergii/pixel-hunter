const changeLevel = (state, level) => {
  if (level < 0) {
    throw new Error(`Level shouldn't be negative.`);
  }

  if (typeof level !== `number`) {
    throw new Error(`Level should be only number type.`);
  }
  const newState = Object.assign({}, state, {level});
  return Object.freeze(newState);
};

export default changeLevel;
