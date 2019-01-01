import {questionsType} from "./../game/configuration";

import questionSingle from "./../templates/question-single";
import questionTwice from "./../templates/question-twice";
import questionTriple from "./../templates/question-triple";

import currentStats from "./../templates/current-stats";
import {createElement} from "../util/util";

const templates = {
  single: questionSingle,
  twice: questionTwice,
  triple: questionTriple
};

const eventNames = {
  single: `change`,
  twice: `change`,
  triple: `click`
};

const isAnswerCorrect = (question, evt) => {
  const {type, options} = question;

  switch (type) {
    case questionsType.SINGLE:
      const userAnswer = document.querySelector(`input:checked`).value;
      const singleOptionIndex = 0;
      return userAnswer === options[singleOptionIndex].thisIs;
    case questionsType.TWICE:
      const totalQuestionsLength = document.querySelectorAll(`.game__option`)
        .length;
      const checkedInputs = document.querySelectorAll(`input:checked`);
      const answerValues = Array.from(checkedInputs).map((input) => {
        return input.value;
      });

      if (answerValues.length === totalQuestionsLength) {
        const initialResult = false;

        return answerValues.reduce((result, answer, index) => {
          return result && answer === options[index];
        }, initialResult);
      } else {
        return `answerWasNotTaken`;
      }
    case questionsType.TRIPLE:
      return evt.target.getAttribute(`data-answer`) === `paint`;
    default: {
      throw new Error(`Wrong question type`);
    }
  }
};

const questionView = (state, callback, timerId) => {
  const currentQuestion = state.questions[state.currentQuestion];
  const {type} = currentQuestion;
  const eventName = eventNames[type];

  const questionTemplate = `<section class="game">
    ${templates[type](currentQuestion)}
    ${currentStats(state.answers, state.questions.length)}
  </section>`;

  const handler = (evt) => {
    const isCurrentAnswerCorrect = isAnswerCorrect(currentQuestion, evt);

    if (isCurrentAnswerCorrect !== `answerWasNotTaken`) {
      clearInterval(timerId);
      callback(isCurrentAnswerCorrect);
    }
  };

  const questionElement = createElement(questionTemplate);
  questionElement
    .querySelector(`.game__content`)
    .addEventListener(eventName, handler);

  return questionElement;
};

export default questionView;
