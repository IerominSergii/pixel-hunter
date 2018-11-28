/* eslint-disable max-nested-callbacks */
import {assert} from "chai";
import {countGamePoints, createGameTimer, goNextLevel} from "./game-data";

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
      }, /Unknown answer type, check the 'ANSWER_POINTS' object/);
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

describe(`Timer`, () => {
  describe(`correct results:`, () => {
    it(`should return the timer object`, () => {
      const gameTimer = {
        time: 30,
        tick() {
          this.time = this.time -= 1;
          if (this.time === 0) {
            return `Time is over`;
          }

          return this.time;
        }
      };
      assert.equal(createGameTimer(30), gameTimer);
    });
    it(`should decrease the time`, () => {
      const gameTimer = createGameTimer(30);
      gameTimer.tick();
      assert.equal(gameTimer.time, 29);
    });
    it(`should report the time is over`, () => {
      const gameTimer = createGameTimer(1);
      const timerMessage = gameTimer.tick();
      assert.equal(timerMessage, `Time is over`);
    });
  });
  describe(`incorrect results:`, () => {
    it(`shouldn't work with negative time value or 0`, () => {
      assert.throws(() => {
        createGameTimer(-1);
      }, /Time shouldn't be negative or equal 0/);
    });
    it(`shouldn't work with more than MAX_TIMER_VALUE`, () => {
      assert.throws(() => {
        createGameTimer(31);
      }, /Time shouldn't be more than MAX_TIMER_VALUE/);
    });
  });
});

describe(`goNextLevel`, () => {
  describe(`correct results:`, () => {
    it(`should add new results`, () => {
      const timeLeft = 15;
      const newAnswers = goNextLevel([`fast`, `slow`], timeLeft);
      assert.deepEqual(newAnswers, [`fast`, `slow`, `correct`]);
    });
    it(`should count fast answer properly`, () => {
      const timeLeft = 25;
      const state = {
        currentLevel: 0,
        answers: [`fast`, `slow`],
        isFinished: false
      };
      const newAnswers = goNextLevel(state, timeLeft);
      assert.deepEqual(newAnswers.answers, [`fast`, `slow`, `fast`]);
    });
    it(`should count slow answer properly`, () => {
      const timeLeft = 5;
      const newAnswers = goNextLevel([`fast`, `slow`], timeLeft);
      assert.deepEqual(newAnswers, [`fast`, `slow`, `slow`]);
    });
    it(`should add wrong result if time was over`, () => {
      const timeLeft = 0;
      const newAnswers = goNextLevel([`fast`, `slow`], timeLeft);
      assert.deepEqual(newAnswers, [`fast`, `slow`, `wrong`]);
    });
  });

  describe(`incorrect results:`, () => {
    it(`shouldn't go to the next level`, () => {
      assert.throws(() => {
        createGameTimer(-1);
      }, /Time shouldn't be negative or equal 0/);
    });
    it(`shouldn't work with more than MAX_TIMER_VALUE`, () => {
      assert.throws(() => {
        createGameTimer(31);
      }, /Time shouldn't be more than MAX_TIMER_VALUE/);
    });
  });
});
