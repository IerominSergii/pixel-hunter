import {assert} from "chai";
import setAnswer from "./set-answer";
import {getInitialState} from "./configuration";

describe(`setAnswer`, () => {
  it(`should set new answer`, () => {
    assert.equal(
        setAnswer(getInitialState(), `correct`).answers.length,
        [`correct`].length
    );
  });
  it(`should set new answer correctly`, () => {
    const testState1 = getInitialState();
    const testState2 = setAnswer(testState1, `correct`);
    const testState3 = setAnswer(testState2, `wrong`);

    assert.equal(testState3.answers[0], `correct`);
    assert.equal(testState3.answers[1], `wrong`);
  });
  it(`shouldn't allow set new answer with wrong type`, () => {
    assert.throws(() => {
      setAnswer(getInitialState(), 11);
    }, /Wrong newAnswer type, should be string./);
  });
  it(`shouldn't count unknown the 'bonuses' object result`, () => {
    assert.throws(() => {
      setAnswer(getInitialState(), `bebebe`);
    }, /Unknown answer type, check the 'bonuses' object./);
  });
});
