import setLives from "./set-lives";

const loseLife = (state) => {
  const {lives} = state;

  return setLives(state, lives - 1);
};

export default loseLife;
