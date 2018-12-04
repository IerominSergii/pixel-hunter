import {assert} from "chai";
import countPoints from "./count-points";
import {INITIAL_STATE} from "./configuration";

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

describe(`countPoints. Correct results:`, () => {
  it(`should return 1000 if all answers are correct. Left lives - 0.`, () => {
    const answers = correctAnswers;
    const lives = 0;
    const testState = Object.assign({}, INITIAL_STATE, {answers, lives});

    assert.equal(countPoints(testState).finalResult, 1000);
  });
  it(`should return 1050 if all answers are correct. Left lives - 1.`, () => {
    const answers = correctAnswers;
    const lives = 1;
    const testState = Object.assign({}, INITIAL_STATE, {answers, lives});

    assert.equal(countPoints(testState).finalResult, 1050);
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
    const testState = Object.assign({}, INITIAL_STATE, {answers, lives});

    assert.equal(countPoints(testState).finalResult, 1200);
  });
  it(`should return '-1' if the answers amount is less than 10.`, () => {
    const answers = [`correct`, `correct`, `correct`];
    const lives = 1;
    const testState = Object.assign({}, INITIAL_STATE, {answers, lives});

    assert.equal(countPoints(testState).finalResult, -1);
  });
});

describe(`countPoints. Incorrect results:`, () => {
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
    const lives = 1;
    const testState = Object.assign({}, INITIAL_STATE, {answers, lives});

    assert.throws(() => {
      countPoints(testState);
    }, /Unknown answer type, check the 'ANSWER_POINTS' object/);
  });
  it(`shouldn't work with not string type results`, () => {
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
    const lives = 1;
    const testState = Object.assign({}, INITIAL_STATE, {answers, lives});

    assert.throws(() => {
      countPoints(testState);
    }, /Answer should be in string type/);
  });
  it(`Lives amount shouldn't be negative`, () => {
    const answers = correctAnswers;
    const lives = -1;
    const testState = Object.assign({}, INITIAL_STATE, {answers, lives});

    assert.throws(() => {
      countPoints(testState);
    }, /Lives amount shouldn't be negative/);
  });
});
