export default (state, questions) => {
  if (!Array.isArray(questions)) {
    throw new Error(`questions should be array type`);
  }

  const newQuestions = Object.freeze(questions.slice());
  return Object.assign({}, state, {questions: newQuestions});
};
