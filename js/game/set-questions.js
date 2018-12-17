const setQuestions = (state, questions) => {
  const newQuestions = Object.freeze(questions.slice());
  const newState = Object.assign({}, state, {questions: newQuestions});

  return newState;
};

export default setQuestions;
