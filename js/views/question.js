import {questionsType} from "./../game/configuration";

import questionSingle from "./../templates/question-single";
import questionTwice from "./../templates/question-twice";
import questionTriple from "./../templates/question-triple";

import currentStats from "./../templates/current-stats";
import {createElement} from "../util/util";

const templates = new Map([
  [questionsType.SINGLE, questionSingle],
  [questionsType.TWICE, questionTwice],
  [questionsType.TRIPLE, questionTriple]
]);

const eventNames = new Map([
  [questionsType.SINGLE, `change`],
  [questionsType.TWICE, `change`],
  [questionsType.TRIPLE, `click`]
]);

const getQuestionTemplate = (question) => {
  return templates.get(question.type)(question);
};

const questionView = (state, callback, timerId) => {
  const currentQuestion = state.questions[state.currentQuestion];
  const eventName = eventNames.get(currentQuestion.type);

  const questionTemplate = `<section class="game">
    ${getQuestionTemplate(currentQuestion)}
    ${currentStats(state.answers, state.questions.length)}
  </section>`;

  const handler = (evt) => {
    clearInterval(timerId);
    callback(evt);
  };

  const questionElement = createElement(questionTemplate);
  questionElement
    .querySelector(`.game__content`)
    .addEventListener(eventName, handler);

  return questionElement;
};

export default questionView;
