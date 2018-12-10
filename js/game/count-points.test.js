import {assert} from "chai";
import countPoints from "./count-points";

const correctAnswers = [
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

const questionsAmount = 10;

describe(`countPoints. Correct results:`, () => {
  it(`should return 1000 if all answers are correct. Left lives - 0.`, () => {
    const answers = correctAnswers;
    const lives = 0;

    assert.equal(countPoints(answers, lives, questionsAmount), 1000);
  });
  it(`should return 1050 if all answers are correct. Left lives - 1.`, () => {
    const answers = correctAnswers;
    const lives = 1;

    assert.equal(countPoints(answers, lives, questionsAmount), 1050);
  });
  it(`should return 1200 if all answers are correct. Left lives - 3.`, () => {
    const answers = [
      `fast`,
      `fast`,
      `slow`,
      `correct`,
      `correct`,
      `correct`,
      `correct`,
      `correct`,
      `correct`,
      `correct`
    ];
    const lives = 3;

    assert.equal(countPoints(answers, lives, questionsAmount), 1200);
  });
  it(`should return '-1' if the answers amount is less than questionsAmount.`, () => {
    const answers = [`wrong`, `wrong`, `wrong`, `wrong`];
    const lives = -1;

    assert.equal(countPoints(answers, lives, questionsAmount), -1);
  });
});
