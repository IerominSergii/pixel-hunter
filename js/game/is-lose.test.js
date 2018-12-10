import {assert} from "chai";
import isLose from "./is-lose";

describe(`isLose`, () => {
  it(`should return true`, () => {
    assert.equal(isLose(-1), true);
  });
  it(`should return true`, () => {
    assert.equal(isLose(-2), true);
  });
  it(`should return false`, () => {
    assert.equal(isLose(2), false);
  });
});
