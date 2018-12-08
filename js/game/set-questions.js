const setQuestions = (state, questions) => {
  const newQuestions = Object.freeze(questions.slice());

  return Object.freeze(Object.assign({}, state, {questions: newQuestions}));
};

export default setQuestions;
