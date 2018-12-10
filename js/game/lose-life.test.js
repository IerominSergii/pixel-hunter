import {assert} from "chai";
import loseLife from "./lose-life";
import {getInitialState} from "./configuration";
import setLives from "./set-lives";

const state = getInitialState();

describe(`loseLife`, () => {
  it(`should lose 1 life`, () => {
    const testState1 = setLives(state, 3);
    assert.equal(loseLife(testState1).lives, 2);
  });
});
