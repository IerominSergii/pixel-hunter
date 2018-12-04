import {ANSWER_POINTS, SAVED_LIFE_VALUE, LEVEL_AMOUNT} from "./configuration";

const checkLives = (lives) => {
  if (lives < 0) {
    throw new Error(`Lives amount shouldn't be negative`);
  }
};

const checkAnswer = (answer) => {
  if (typeof answer !== `string`) {
    throw new Error(`Answer should be in string type`);
  }

  if (isNaN(ANSWER_POINTS[answer])) {
    throw new Error(`Unknown answer type, check the 'ANSWER_POINTS' object`);
  }
};

const isLose = (answersAmount) => {
  return answersAmount < LEVEL_AMOUNT ? true : false;
};

const countPoints = (state) => {
  let {answers, lives, finalResult} = state;

  if (isLose(answers.length)) {
    finalResult = -1;
  } else {
    checkLives(lives);

    let answersResult = 0;

    answers.forEach((answer) => {
      checkAnswer(answer);

      answersResult += ANSWER_POINTS[answer];
    });

    finalResult = answersResult + lives * SAVED_LIFE_VALUE;
  }

  return Object.assign({}, state, {finalResult});
};

export default countPoints;
