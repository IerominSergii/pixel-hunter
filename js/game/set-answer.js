import {bonusValue} from "./../configuration";

export default (state, newAnswer) => {
  if (typeof newAnswer !== `string`) {
    throw new Error(`Wrong newAnswer type, should be string.`);
  }

  if (isNaN(bonusValue[newAnswer.toUpperCase()])) {
    throw new Error(`Unknown answer type, check the 'bonuses' object.`);
  }

  const newAnswers = state.answers.slice();
  newAnswers.push(newAnswer);

  const newState = Object.assign({}, state, {
    answers: Object.freeze(newAnswers)
  });
  return Object.freeze(newState);
};
