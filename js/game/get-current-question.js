const getCurrentQuestion = (state) => {
  return state.questions[state.currentQuestion];
};

export default getCurrentQuestion;
