import setTime from "./set-time";

export default (state) => {
  return setTime(state, state.time - 1);
};
