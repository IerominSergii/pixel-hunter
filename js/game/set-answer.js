const setAnswer = (state, newAnswer) => {
  if (typeof newAnswer !== `string`) {
    throw new Error(`Wrong newAnswer type, should be string.`);
  }

  const {answers} = state;
  answers.push(newAnswer);

  return Object.assign({}, state, {answers});
};

export default setAnswer;
