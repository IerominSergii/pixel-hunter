import {assert} from "chai";
import setTimerTime from "./set-timer-time";
import {getInitialState} from "./configuration";

describe(`setTimerTime. Correct results:`, () => {
  it(`should set the time`, () => {
    assert.equal(setTimerTime(getInitialState(), 30).timer, 30);
  });
});

describe(`setTimerTime. Incorrect results:`, () => {
  it(`shouldn't work with negative time value`, () => {
    assert.throws(() => {
      setTimerTime(getInitialState(), -3);
    }, /Time shouldn't be negative/);
  });
  it(`shouldn't allow not number type timeValue`, () => {
    assert.throws(() => {
      setTimerTime(getInitialState(), []);
    }, /Time type should be number/);
  });
});
