import {assert} from "chai";
import setQuestions from "./set-questions";
import {getInitialState} from "./../configuration";

const state = getInitialState();

describe(`setQuestions`, () => {
  const questions = [1, 2, 3, 4, 5];

  it(`should set questions`, () => {
    assert.equal(setQuestions(state, questions).questions.length, 5);
  });
  it(`should be array type`, () => {
    assert.throws(() => {
      setQuestions(state, 12);
    }, /questions should be array type/);
    assert.throws(() => {
      setQuestions(state, `testString`);
    }, /questions should be array type/);
    assert.throws(() => {
      setQuestions(state, true);
    }, /questions should be array type/);
  });
});
