import {assert} from "chai";
import setAnswer from "./set-answer";
import {INITIAL_STATE} from "./configuration";

describe(`setAnswer`, () => {
  it(`should set new answer`, () => {
    assert.equal(
        setAnswer(INITIAL_STATE, `correct`).answers.length,
        [`correct`].length
    );
  });
  it(`shouldn't allow set new answer with wrong type`, () => {
    assert.throws(() => {
      setAnswer(INITIAL_STATE, 11);
    }, /Wrong newAnswer type, should be string./);
  });
});
