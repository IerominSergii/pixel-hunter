import {ANSWER_POINTS} from "./configuration";

const setAnswer = (state, newAnswer) => {
  if (typeof newAnswer !== `string`) {
    throw new Error(`Wrong newAnswer type, should be string.`);
  }

  if (isNaN(ANSWER_POINTS[newAnswer])) {
    throw new Error(`Unknown answer type, check the 'ANSWER_POINTS' object.`);
  }

  const newAnswers = state.answers.slice();
  newAnswers.push(newAnswer);

  const newState = Object.assign({}, state, {
    answers: Object.freeze(newAnswers)
  });
  return Object.freeze(newState);
};

export default setAnswer;
