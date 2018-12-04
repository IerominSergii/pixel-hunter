const defineAnswer = (isAnswerCorrect, time) => {
  if (typeof isAnswerCorrect !== `boolean`) {
    throw new Error(`wrong isAnswerCorrect type, should be boolean.`);
  }

  if (typeof time !== `number`) {
    throw new Error(`wrong time type, should be number.`);
  }

  if (isAnswerCorrect) {
    if (time <= 30 && time > 20) {
      return `fast`;
    } else if (time <= 20 && time > 10) {
      return `correct`;
    } else if (time <= 10 && time > 0) {
      return `slow`;
    } else {
      return `wrong`;
    }
  } else {
    return `wrong`;
  }
};

export default defineAnswer;
