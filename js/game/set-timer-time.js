const setTimerTime = (state, timeValue) => {
  if (typeof timeValue !== `number`) {
    throw new Error(`Time type should be number`);
  }

  if (timeValue < 0) {
    throw new Error(`Time shouldn't be negative`);
  }

  const newState = Object.assign({}, state, {timer: timeValue});
  return Object.freeze(newState);
};

export default setTimerTime;
