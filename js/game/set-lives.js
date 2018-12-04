const setLives = (livesAmount, currentAnswer) => {
  let newLivesAmount = livesAmount;

  if (typeof currentAnswer !== `string`) {
    throw new Error(`Wrong answer type.`);
  }

  if (currentAnswer === `wrong`) {
    newLivesAmount = livesAmount - 1;
  }

  return newLivesAmount;
};

export default setLives;
