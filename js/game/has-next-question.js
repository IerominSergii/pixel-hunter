const hasNextQuestion = (state) => {
  return state.questions.length > state.currentQuestion + 1;
};

export default hasNextQuestion;
