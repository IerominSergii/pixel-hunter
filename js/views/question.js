import {questionsType} from "./../game/configuration";
import {createElement} from "../util/util";

import questionSingle from "./../templates/question-single";
import questionTwice from "./../templates/question-twice";
import questionTriple from "./../templates/question-triple";

import currentStats from "./../templates/current-stats";

const getQuestionTemplate = (question) => {
  switch (question.type) {
    case questionsType.SINGLE: {
      return questionSingle(question);
    }
    case questionsType.TWICE: {
      return questionTwice(question);
    }
    case questionsType.TRIPLE: {
      return questionTriple(question);
    }
    default: {
      throw new Error(`Wrong question type`);
    }
  }
};

const bindHandlers = (element, questionType, callback) => {
  const gameForm = element.querySelector(`.game__content`);

  switch (questionType) {
    case questionsType.SINGLE:
      const singleQuestionHandler = () => {
        callback();
      };

      gameForm.addEventListener(`change`, singleQuestionHandler);
      break;
    case questionsType.TWICE:
      const twiceQuestionHandler = () => {
        const checkedInputs = gameForm.querySelectorAll(`input:checked`);
        if (checkedInputs.length === 2) {
          callback();
        }
      };

      gameForm.addEventListener(`change`, twiceQuestionHandler);
      break;
    case questionsType.TRIPLE:
      const gameOptions = gameForm.querySelectorAll(`.game__option`);

      const tripleQuestionHandler = () => {
        callback();
      };

      for (let i = 0; i < gameOptions.length; i++) {
        gameOptions[i].addEventListener(`click`, tripleQuestionHandler);
      }
      break;
    default: {
      throw new Error(`Wrong question type`);
    }
  }
};

const getQuestionElement = (question) => {
  const template = getQuestionTemplate(question);
  const element = createElement(template);
  bindHandlers(element, question.type);

  return element;
};

const questionView = (questions, state) => {
  const currentQuestion = questions[state.currentQuestion];

  return `<section class="game">
    ${getQuestionElement(currentQuestion)}
    ${currentStats(state.answers, questions.length)}
  </section>`;
};

export default questionView;
