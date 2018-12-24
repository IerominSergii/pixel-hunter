import {getInitialState} from "./configuration";

const resetState = (state) => {
  const {questions} = state;
  const initialState = getInitialState();
  const newQuestions = Object.freeze(questions);

  return Object.freeze(
      Object.assign({}, initialState, {questions: newQuestions})
  );
};

export default resetState;
