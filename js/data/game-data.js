const answerPoints = {
  correct: 100,
  fast: 150,
  slow: 50,
  false: 0
};

const savedLifeValue = 50;

const maxLivesAmount = 3;
const gameLevels = 10;

export const countGamePoints = (answers, savedLife) => {
  // lives
  if (savedLife > maxLivesAmount) {
    throw new Error(`Enormous lives amount, more than max lives`);
  }

  if (savedLife < 0) {
    throw new Error(`Lives amount should be more than 0`);
  }

  // answers
  if (answers.length > gameLevels) {
    throw new Error(`Enormous results amount, more than levels`);
  }

  if (answers.length <= 0) {
    throw new Error(`Answers array shouldn't be empty`);
  }

  if (answers.length < 10) {
    return -1;
  }

  // main logic
  let answersResult = 0;

  answers.forEach((answer) => {
    if (typeof answer !== `string`) {
      throw new Error(`Answer should be in string type`);
    }

    if (isNaN(answerPoints[answer])) {
      throw new Error(`Unknown answer type, check the 'answerPoints' object`);
    }

    answersResult += answerPoints[answer];
  });

  const lifeResult = savedLife * savedLifeValue;

  return answersResult + lifeResult;
};
