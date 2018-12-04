import {MAX_TIMER_VALUE} from "./configuration";

const setTimerTime = (state, timeValue) => {
  if (timeValue <= 0 || timeValue > MAX_TIMER_VALUE) {
    throw new Error(
        `Time shouldn't be negative, equal 0 or more than MAX_TIMER_VALUE`
    );
  }

  if (typeof timeValue !== `number`) {
    throw new Error(`time type should be number`);
  }

  const newState = Object.assign({}, state, {timer: timeValue});
  return Object.freeze(newState);
};

export default setTimerTime;
