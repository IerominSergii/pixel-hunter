import {answersTypes} from "./configuration";

export default (isAnswerCorrect, time) => {
  if (typeof isAnswerCorrect !== `boolean`) {
    throw new Error(`wrong isAnswerCorrect type, should be boolean.`);
  }

  if (typeof time !== `number`) {
    throw new Error(`wrong time type, should be number.`);
  }

  if (isAnswerCorrect && time >= 0) {
    if (time > 20) {
      return answersTypes.FAST;
    } else if (time < 10) {
      return answersTypes.SLOW;
    } else {
      return answersTypes.CORRECT;
    }
  } else {
    return answersTypes.WRONG;
  }
};
