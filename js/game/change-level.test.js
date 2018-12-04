import {assert} from "chai";
import changeLevel from "./change-level";
import {INITIAL_STATE} from "./configuration";

describe(`changeLevel`, () => {
  it(`should return new level`, () => {
    assert.equal(changeLevel(INITIAL_STATE, 2).level, 2);
    assert.equal(changeLevel(INITIAL_STATE, 6).level, 6);
    assert.equal(changeLevel(INITIAL_STATE, 9).level, 9);
  });
  it(`shouldn't allow set the negative value`, () => {
    assert.throws(
        () => changeLevel(INITIAL_STATE, -2).level,
        /Level shouldn't be negative./
    );
  });
  it(`shouldn't allow set not number type`, () => {
    assert.throws(
        () => changeLevel(INITIAL_STATE, []).level,
        /Level should be only number type./
    );
  });
});
