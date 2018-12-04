import {assert} from "chai";
import setLives from "./set-lives";

describe(`setLives`, () => {
  it(`should set new life`, () => {
    assert.equal(setLives(3, `wrong`), 2);
    assert.equal(setLives(3, `correct`), 3);
    assert.equal(setLives(3, `fast`), 3);
    assert.equal(setLives(3, `slow`), 3);
  });
  it(`shouldn't work with not string answer type`, () => {
    assert.throws(() => {
      setLives(3, {});
    }, /Wrong answer type./);
  });
});
