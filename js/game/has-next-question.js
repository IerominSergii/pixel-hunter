const hasNextQuestion = (state) => {
  return state.questions.length > state.currentQuestion;
};

export default hasNextQuestion;
