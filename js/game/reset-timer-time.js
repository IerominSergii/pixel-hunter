import {DEFAULT_TIMER} from "./configuration";

const resetTimerTime = (state) => {
  const newState = Object.assign({}, state, {timer: DEFAULT_TIMER});
  return Object.freeze(newState);
};

export default resetTimerTime;
