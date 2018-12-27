export const getInitialState = () => {
  return Object.freeze({
    name: ``,
    lives: DEFAULT_LIVES,
    isGameActive: false,
    answers: Object.freeze([]),
    questions: Object.freeze([]),
    currentQuestion: 0,
    timer: DEFAULT_TIMER
  });
};

export const ANSWER_POINTS = {
  correct: 100,
  fast: 150,
  slow: 50,
  wrong: 0
};

export const FAST_BONUS = 50;
export const SLOW_BONUS = 50;

export const ANSWERS_TYPES = {
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`,
  UNKNOWN: `unknown`
};

export const questionsType = {
  SINGLE: `single`,
  TWICE: `twice`,
  TRIPLE: `triple`
};

export const SAVED_LIFE_VALUE = 50;
export const DEFAULT_LIVES = 3;
export const DEFAULT_TIMER = 7;
