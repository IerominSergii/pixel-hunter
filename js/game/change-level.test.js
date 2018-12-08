import {assert} from "chai";
import changeLevel from "./change-level";
import {getInitialState} from "./configuration";
import setQuestions from "./set-questions";
import setCurrentQuestion from "./set-current-question";

const questions = [1, 2, 3, 4, 5];
const newState = setQuestions(getInitialState(), questions);

describe(`changeLevel`, () => {
  it(`should return new currentQuestion`, () => {
    assert.equal(changeLevel(newState).currentQuestion, 1);
  });
  it(`should not return new currentQuestion`, () => {
    const testState = setCurrentQuestion(newState, 5);

    assert.equal(changeLevel(testState).currentQuestion, 5);
  });
});
