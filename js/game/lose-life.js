import setLives from "./set-lives";

export default (state) => {
  const {lives} = state;

  return setLives(state, lives - 1);
};
