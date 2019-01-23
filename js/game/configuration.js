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

export const bonuses = {
  CORRECT: 100,
  FAST: 50,
  SLOW: 50,
  WRONG: 0,
  LIFE: 50
};

export const answersTypes = {
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

export const ANSWER_VALUE = 100;
export const DEFAULT_LIVES = 3;
export const DEFAULT_TIMER = 30;
