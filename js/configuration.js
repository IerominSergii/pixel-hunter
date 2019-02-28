const DEFAULT_LIVES_AMOUNT = 3;
export const DEFAULT_TIMER = 4;

export const getInitialState = () => {
  return Object.freeze({
    name: ``,
    lives: DEFAULT_LIVES_AMOUNT,
    isGameActive: false,
    answers: Object.freeze([]),
    questions: Object.freeze([]),
    currentQuestion: 0,
    time: DEFAULT_TIMER
  });
};

export const bonusValue = {
  CORRECT: 100,
  FAST: 50,
  SLOW: 50,
  WRONG: 0,
  LIFE: 50,
  UNKNOWN: 0
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
