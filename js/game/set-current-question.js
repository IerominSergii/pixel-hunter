const setCurrentQuestion = (state, currentQuestion) => {
  if (typeof currentQuestion !== `number`) {
    throw new Error(`currentQuestion type should be number`);
  }

  if (currentQuestion < 0) {
    throw new Error(`currentQuestion should not be negative`);
  }

  return Object.freeze(Object.assign({}, state, {currentQuestion}));
};

export default setCurrentQuestion;
