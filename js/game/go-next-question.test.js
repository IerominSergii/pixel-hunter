import {assert} from "chai";
import {getInitialState} from "./configuration";
import goNextQuestion from "./go-next-question";

const state = getInitialState();

describe(`goNextQuestion`, () => {
  it(`should increase currentQuestion`, () => {
    assert.equal(goNextQuestion(state).currentQuestion, 1);
  });
});
