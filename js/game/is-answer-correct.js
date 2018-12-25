import {questionsType} from "./configuration";
import {questions} from "../data/data";

const isAnswerCorrect = (currentQuestion, evt) => {
  const question = questions[currentQuestion];
  const type = question.type;
  const options = question.options;

  switch (type) {
    case questionsType.SINGLE:
      const checkedInput = document.querySelector(`input:checked`).value;

      return checkedInput === options[0].thisIs;
    case questionsType.TWICE:
      const checkedInputs = document.querySelectorAll(`input:checked`);
      const userAnswers = Array.from(checkedInputs).map((input) => {
        return input.value;
      });

      if (checkedInputs.length === 2) {
        if (
          userAnswers[0] === options[0].thisIs &&
          userAnswers[1] === options[1].thisIs
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return `answerWasNotTaken`;
      }
    case questionsType.TRIPLE:
      const userAnswer = evt.target.getAttribute(`data-answer`);
      return userAnswer === `paint`;
    default: {
      throw new Error(`Wrong question type`);
    }
  }
};

export default isAnswerCorrect;
