const hasNextLevel = (questionsAmount, currentLevel) => {
  if (typeof questionsAmount !== `number` || typeof currentLevel !== `number`) {
    throw new Error(`questionsAmount and currentLevel should be number type`);
  }

  return questionsAmount > currentLevel;
};

export default hasNextLevel;
