import {assert} from "chai";
import hasNextLevel from "./has-next-level";

describe(`hasNextLevel`, () => {
  it(`should return true`, () => {
    assert.equal(hasNextLevel(10, 2), true);
  });
  it(`should return false`, () => {
    assert.equal(hasNextLevel(10, 11), false);
  });
  it(`should not allow work with not number params`, () => {
    assert.throws(() => {
      hasNextLevel(10, `2`);
    }, /questionsAmount and currentLevel should be number type/);
    assert.throws(() => {
      hasNextLevel([], 2);
    }, /questionsAmount and currentLevel should be number type/);
  });
});
