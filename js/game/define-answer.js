import {ANSWERS_TYPES} from "./configuration";

const defineAnswer = (isAnswerCorrect, time) => {
  if (typeof isAnswerCorrect !== `boolean`) {
    throw new Error(`wrong isAnswerCorrect type, should be boolean.`);
  }

  if (typeof time !== `number`) {
    throw new Error(`wrong time type, should be number.`);
  }

  if (isAnswerCorrect && time >= 0) {
    if (time > 20) {
      return ANSWERS_TYPES.FAST;
    } else if (time < 10) {
      return ANSWERS_TYPES.SLOW;
    } else {
      return ANSWERS_TYPES.CORRECT;
    }
  } else {
    return ANSWERS_TYPES.WRONG;
  }
};

export default defineAnswer;
