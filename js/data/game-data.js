// count results function ---- start
const ANSWER_POINTS = {
  correct: 100,
  fast: 150,
  slow: 50,
  false: 0
};
const SAVED_LIFE_VALUE = 50;
const MAX_LIVES_AMOUNT = 3;
const GAME_LEVELS = 10;

export const countGamePoints = (answers, savedLife) => {
  // lives
  if (savedLife > MAX_LIVES_AMOUNT) {
    throw new Error(`Enormous lives amount, more than max lives`);
  }

  if (savedLife < 0) {
    throw new Error(`Lives amount should be more than 0`);
  }

  // answers
  if (answers.length > GAME_LEVELS) {
    throw new Error(`Enormous results amount, more than levels`);
  }

  if (answers.length <= 0) {
    throw new Error(`Answers array shouldn't be empty`);
  }

  if (answers.length < 10) {
    return -1;
  }

  // main logic
  let answersResult = 0;

  answers.forEach((answer) => {
    if (typeof answer !== `string`) {
      throw new Error(`Answer should be in string type`);
    }

    if (isNaN(ANSWER_POINTS[answer])) {
      throw new Error(`Unknown answer type, check the 'ANSWER_POINTS' object`);
    }

    answersResult += ANSWER_POINTS[answer];
  });

  const lifeResult = savedLife * SAVED_LIFE_VALUE;

  return answersResult + lifeResult;
};
// count results function ---- end

// timer function ---- start
const MAX_TIMER_VALUE = 30;

export const createGameTimer = (time) => {
  if (time <= 0) {
    throw new Error(`Time shouldn't be negative or equal 0`);
  }

  if (time > MAX_TIMER_VALUE) {
    throw new Error(`Time shouldn't be more than MAX_TIMER_VALUE`);
  }

  const gameTimer = {
    time,
    tick() {
      this.time = this.time -= 1;
      if (this.time === 0) {
        return `Time is over`;
      }

      return this.time;
    }
  };

  return gameTimer;
};
// timer function ---- end

// goNextLevel function ---- start

// ---- STATE EXAMPLE ----
// const state = {
//   currentLevel: 0,
//   answers: [],
//   isFinished: false
// };
const setAnswerDependsOnTheTime = (time, answers) => {
  const newAnswers = answers.slice();

  if (time <= 30 && time > 20) {
    newAnswers.push(`fast`);
  } else if (time <= 20 && time > 10) {
    newAnswers.push(`correct`);
  } else if (time <= 10 && time > 0) {
    newAnswers.push(`slow`);
  } else {
    newAnswers.push(`wrong`);
  }

  return newAnswers;
};

export const goNextLevel = (state, time) => {
  const {answers, currentLevel, isFinished} = state;

  if (currentLevel < 10) {
    answers = setAnswerDependsOnTheTime(time, answers);
  } else {
    isFinished = true;
  }

  const newState = Object.assign({}, state, {
    answers,
    currentLevel,
    isFinished
  });

  return newState;
};
// goNextLevel function ---- end
