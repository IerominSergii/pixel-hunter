import {ANSWER_POINTS, SAVED_LIFE_VALUE} from "./configuration";
import isLose from "./is-lose";

const returnLoseResult = () => {
  return -1;
};

const returnResult = (answers, lives) => {
  const initialValue = 0;

  const answersResult = answers.reduce((sum, answer) => {
    return sum + ANSWER_POINTS[answer];
  }, initialValue);

  return answersResult + lives * SAVED_LIFE_VALUE;
};

const countPoints = (answers, lives, questionsAmount) => {
  let finalResult;

  if (isLose(lives) || answers.length < questionsAmount) {
    finalResult = returnLoseResult();
  } else {
    finalResult = returnResult(answers, lives);
  }

  return finalResult;
};

export default countPoints;
