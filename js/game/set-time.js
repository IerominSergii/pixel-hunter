export default (state, timeValue) => {
  if (typeof timeValue !== `number`) {
    throw new Error(`Time type should be number`);
  }

  if (timeValue < 0) {
    throw new Error(`Time shouldn't be negative`);
  }

  return Object.freeze(Object.assign({}, state, {time: timeValue}));
};
