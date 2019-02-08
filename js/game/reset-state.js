import {getInitialState} from "./../configuration";

export default (state) => {
  const {questions} = state;
  const initialState = getInitialState();
  const newQuestions = Object.freeze(questions);

  return Object.freeze(
      Object.assign({}, initialState, {questions: newQuestions})
  );
};
