import {DEFAULT_TIMER} from "../game/configuration";

const resetTimer = (state) => {
  return Object.freeze(Object.assign({}, state, {timer: DEFAULT_TIMER}));
};

export default resetTimer;
