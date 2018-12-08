import {assert} from "chai";
import setCurrentQuestion from "./set-current-question";
import {getInitialState} from "./configuration";

describe(`setCurrentQuestion`, () => {
  it(`shouldn't be negative`, () => {
    assert.throws(() => {
      setCurrentQuestion(getInitialState(), -2);
    }, /currentQuestion should not be negative/);
  });
  it(`should be number type`, () => {
    assert.throws(() => {
      setCurrentQuestion(getInitialState(), `-2`);
    }, /currentQuestion type should be number/);
  });
});
