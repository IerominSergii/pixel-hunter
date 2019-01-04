export default (state) => {
  return state.questions.length > state.currentQuestion + 1;
};
