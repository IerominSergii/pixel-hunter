import {DEFAULT_TIMER} from "./../configuration";

export default (state) => {
  const newState = Object.assign({}, state, {time: DEFAULT_TIMER});
  return Object.freeze(newState);
};
