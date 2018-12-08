import hasNextLevel from "./has-next-level";
import setCurrentQuestion from "./set-current-question";

const changeLevel = (state) => {
  const {currentQuestion, questions} = state;
  let newCurrentQuestion = currentQuestion;

  if (hasNextLevel(questions.length, currentQuestion)) {
    newCurrentQuestion = currentQuestion + 1;
  }

  const newState = setCurrentQuestion(state, newCurrentQuestion);

  return Object.freeze(
      Object.assign({}, newState, {currentQuestion: newCurrentQuestion})
  );
};

export default changeLevel;
