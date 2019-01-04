export default (state, questions) => {
  const newQuestions = Object.freeze(questions.slice());
  return Object.assign({}, state, {questions: newQuestions});
};
