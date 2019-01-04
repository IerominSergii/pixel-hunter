import {DEFAULT_TIMER} from "../game/configuration";

export default (state) => {
  return Object.freeze(Object.assign({}, state, {timer: DEFAULT_TIMER}));
};
