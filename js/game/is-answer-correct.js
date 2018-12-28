import {questionsType} from "./configuration";

const isAnswerCorrect = (question, userAnswer) => {
  const {type, options} = question;

  switch (type) {
    case questionsType.SINGLE:
      const singleOptionIndex = 0;
      return userAnswer === options[singleOptionIndex].thisIs;
    case questionsType.TWICE:
      if (userAnswer.values.length === userAnswer.totalQuestionsLength) {
        const initialResult = false;

        return userAnswer.values.reduce((result, answer, index) => {
          return result && answer === options[index];
        }, initialResult);
      } else {
        return `answerWasNotTaken`;
      }
    case questionsType.TRIPLE:
      return userAnswer === `paint`;
    default: {
      throw new Error(`Wrong question type`);
    }
  }
};

export default isAnswerCorrect;
