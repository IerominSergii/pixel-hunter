import {assert} from "chai";
import createTimer from "./create-timer";

describe(`createTimer. Correct results:`, () => {
  it(`should decrease the time`, () => {
    const gameTimer = createTimer(30);
    gameTimer.tick();
    assert.equal(gameTimer.time, 29);
  });
  it(`should report the time is over`, () => {
    const gameTimer = createTimer(1);
    gameTimer.tick();
    assert.equal(gameTimer.isOver, true);
  });
});

describe(`createTimer. Incorrect results:`, () => {
  it(`shouldn't work with negative time value or 0 or more than MAX_TIMER_VALUE`, () => {
    assert.throws(() => {
      createTimer(-1);
    }, /Time shouldn't be negative, equal 0 or more than MAX_TIMER_VALUE/);
  });
  it(`shouldn't decrease the time if the time is equal 0`, () => {
    const gameTimer = createTimer(1);
    gameTimer.tick();
    gameTimer.tick();
    gameTimer.tick();
    assert.equal(gameTimer.time, 0);
  });
});
