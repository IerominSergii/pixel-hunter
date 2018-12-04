export const INITIAL_STATE = Object.freeze({
  name: ``,
  level: 0,
  lives: 3,
  isDead: false,
  answers: [],
  finalResult: 0
});

export const ANSWER_POINTS = {
  correct: 100,
  fast: 150,
  slow: 50,
  wrong: 0
};

export const SAVED_LIFE_VALUE = 50;
export const MAX_LIVES_AMOUNT = 3;
export const LEVEL_AMOUNT = 10;
export const GAME_LEVELS = 10;
export const MAX_TIMER_VALUE = 30;
