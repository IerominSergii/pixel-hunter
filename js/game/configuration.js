export const getInitialState = () => {
  return Object.freeze({
    name: ``,
    lives: 3,
    answers: Object.freeze([]),
    questions: Object.freeze([]),
    currentQuestion: 0,
    timer: 0
  });
};

export const ANSWER_POINTS = {
  correct: 100,
  fast: 150,
  slow: 50,
  wrong: 0
};

export const ANSWERS_TYPES = {
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`
};

export const SAVED_LIFE_VALUE = 50;
export const DEFAULT_LIVES = 3;
export const DEFAULT_TIMER = 30;
