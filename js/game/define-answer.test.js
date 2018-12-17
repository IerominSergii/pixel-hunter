import {assert} from "chai";
import defineAnswer from "./define-answer";

describe(`defineAnswer`, () => {
  it(`should define answer correctly`, () => {
    assert.equal(defineAnswer(true, 15), `correct`);
    assert.equal(defineAnswer(true, 5), `slow`);
    assert.equal(defineAnswer(true, 25), `fast`);
    assert.equal(defineAnswer(false, 25), `wrong`);
    assert.equal(defineAnswer(true, 0), `slow`);
  });
  it(`shouldn't work with incorrect type data`, () => {
    assert.throws(() => {
      defineAnswer(10, 15);
    }, /wrong isAnswerCorrect type, should be boolean./);
    assert.throws(() => {
      defineAnswer(true, []);
    }, /wrong time type, should be number./);
    assert.throws(() => {
      defineAnswer(false, {});
    }, /wrong time type, should be number./);
  });
});
