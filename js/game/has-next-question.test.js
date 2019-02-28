import {assert} from "chai";
import hasNextQuestion from "./has-next-question";
import {getInitialState} from "./../configuration";
import setQuestions from "./set-questions";
import setCurrentQuestion from "./set-current-question";

const state = getInitialState();
const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const stateWithQuestions = setQuestions(state, questions);

describe(`hasNextQuestion`, () => {
  it(`should return true`, () => {
    const testState1 = setCurrentQuestion(stateWithQuestions, 2);
    const testState2 = setCurrentQuestion(stateWithQuestions, 0);

    assert.equal(hasNextQuestion(testState1), true);

    assert.equal(hasNextQuestion(testState2), true);
  });
  it(`should return false`, () => {
    const testState1 = setCurrentQuestion(stateWithQuestions, 10);
    const testState2 = setCurrentQuestion(stateWithQuestions, 11);
    const testState3 = setCurrentQuestion(stateWithQuestions, 9);

    assert.equal(hasNextQuestion(testState1), false);
    assert.equal(hasNextQuestion(testState2), false);
    assert.equal(hasNextQuestion(testState3), false);
  });
});
