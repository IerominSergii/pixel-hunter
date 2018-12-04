const setAnswer = (state, newAnswer) => {
  if (typeof newAnswer !== `string`) {
    throw new Error(`Wrong newAnswer type, should be string.`);
  }

  const newAnswers = state.answers.slice();
  newAnswers.push(newAnswer);

  const newState = Object.assign({}, state, {
    answers: Object.freeze(newAnswers)
  });
  return Object.freeze(newState);
};

export default setAnswer;
