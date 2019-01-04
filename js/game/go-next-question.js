export default (state) => {
  return Object.freeze(
      Object.assign({}, state, {currentQuestion: state.currentQuestion + 1})
  );
};
