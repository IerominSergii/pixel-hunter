import {assert} from "chai";
import setLives from "./set-lives";
import {getInitialState} from "./configuration";

const state = getInitialState();

describe(`setLives`, () => {
  it(`should set new life`, () => {
    assert.equal(setLives(state, 0).lives, 0);
    assert.equal(setLives(state, 1).lives, 1);
    assert.equal(setLives(state, 2).lives, 2);
    assert.equal(setLives(state, 3).lives, 3);
  });
  it(`shouldn't work with not string lives type`, () => {
    assert.throws(() => {
      setLives(state, {});
    }, /Wrong lives type, should be the number./);
  });
});
