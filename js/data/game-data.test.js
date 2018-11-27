/* eslint-disable max-nested-callbacks */
import {assert} from "chai";
import {countGamePoints} from "./game-data";

describe(`CountGamePoints function:`, () => {
  describe(`correct results:`, () => {
    it(`should return 1000 if all answers are correct. Left lives - 0.`, () => {
      const answers = [
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`
      ];
      assert.equal(countGamePoints(answers, 0), 1000);
    });
    it(`should return 1100 if all answers are correct, one is fast. Left lives - 1.`, () => {
      const answers = [
        `fast`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`
      ];
      assert.equal(countGamePoints(answers, 1), 1100);
    });
    it(`should return 1100 if all answers are correct, one is slow. Left lives - 3.`, () => {
      const answers = [
        `slow`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`
      ];
      assert.equal(countGamePoints(answers, 3), 1100);
    });
    it(`should return '-1' if the answers amount is less than 10`, () => {
      const answers = [
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`
      ];
      assert.equal(countGamePoints(answers, 0), -1);
    });
  });

  describe(`incorrect results:`, () => {
    it(`shouldn't count unknown string results`, () => {
      const answers = [
        `abracadabra`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`
      ];
      assert.throws(() => {
        countGamePoints(answers, 0);
      }, /Unknown answer type, check the 'answerPoints' object/);
    });
    it(`shouldn't work with number type results`, () => {
      const answers = [
        11,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`
      ];
      assert.throws(() => {
        countGamePoints(answers, 0);
      }, /Answer should be in string type/);
    });
    it(`shouldn't work with undefined type results`, () => {
      const answers = [
        undefined,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`
      ];
      assert.throws(() => {
        countGamePoints(answers, 0);
      }, /Answer should be in string type/);
    });
    it(`shouldn't work with enormous results amount`, () => {
      const answers = [
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`
      ];
      assert.throws(() => {
        countGamePoints(answers, 0);
      }, /Enormous results amount, more than levels/);
    });
    it(`shouldn't work with enormous lives amount. More than maxLivesAmount`, () => {
      const answers = [
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`
      ];
      assert.throws(() => {
        countGamePoints(answers, 4);
      }, /Enormous lives amount, more than max lives/);
    });
    it(`shouldn't work with lives amount less than 0`, () => {
      const answers = [
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`
      ];
      assert.throws(() => {
        countGamePoints(answers, -1);
      }, /Lives amount should be more than 0/);
    });
    it(`shouldn't work with empty answers amount`, () => {
      const answers = [];
      assert.throws(() => {
        countGamePoints(answers, 0);
      }, /Answers array shouldn't be empty/);
    });
  });
});
