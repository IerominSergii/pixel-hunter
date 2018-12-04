import {assert} from "chai";
import setTimerTime from "./set-timer-time";
import {INITIAL_STATE} from "./configuration";

describe(`setTimerTime. Correct results:`, () => {
  it(`should decrease the time`, () => {
    assert.equal(setTimerTime(INITIAL_STATE, 30).timer, 30);
  });
});

describe(`setTimerTime. Incorrect results:`, () => {
  it(`shouldn't work with negative time value or 0 or more than MAX_TIMER_VALUE`, () => {
    assert.throws(() => {
      setTimerTime(INITIAL_STATE, -30);
    }, /Time shouldn't be negative, equal 0 or more than MAX_TIMER_VALUE/);
  });
  it(`shouldn't decrease the time if the time is equal 0`, () => {
    assert.throws(() => {
      setTimerTime(INITIAL_STATE, 0);
    }, /Time shouldn't be negative, equal 0 or more than MAX_TIMER_VALUE/);
  });
});
