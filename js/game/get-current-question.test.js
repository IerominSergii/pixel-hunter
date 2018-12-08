import {assert} from "chai";
import getCurrentQuestion from "./get-current-question";
import {getInitialState} from "./configuration";
import setQuestions from "./set-questions";
import setCurrentQuestion from "./set-current-question";

const state = getInitialState();
const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const stateWithQuestions = setQuestions(state, questions);

describe(`getCurrentQuestion`, () => {
  it(`should get current question`, () => {
    const testState1 = setCurrentQuestion(stateWithQuestions, 0);

    assert.equal(getCurrentQuestion(testState1), 1);
  });
});
