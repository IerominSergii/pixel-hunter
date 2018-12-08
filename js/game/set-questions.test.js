import {assert} from "chai";
import setQuestions from "./set-questions";
import {getInitialState} from "./configuration";

const questions = [1, 2, 3, 4, 5];
const state = getInitialState();

describe(`setQuestions`, () => {
  it(`should set questions`, () => {
    assert.equal(setQuestions(state, questions).questions.length, 5);
  });
});
