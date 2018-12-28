import {questionsType} from "./../game/configuration";

import questionSingle from "./../templates/question-single";
import questionTwice from "./../templates/question-twice";
import questionTriple from "./../templates/question-triple";

import currentStats from "./../templates/current-stats";
import {createElement} from "../util/util";
import isAnswerCorrect from "../game/is-answer-correct";

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

const takeUserAnswers = (evt, type) => {
  switch (type) {
    case `single`:
      return document.querySelector(`input:checked`).value;
    case `twice`:
      const totalQuestionsLength = document.querySelectorAll(`.game__option`)
        .length;
      const checkedInputs = document.querySelectorAll(`input:checked`);
      const values = Array.from(checkedInputs).map((input) => {
        return input.value;
      });
      return {totalQuestionsLength, values};
    case `triple`:
      const userAnswer = evt.target.getAttribute(`data-answer`);
      return userAnswer;
    default:
      throw new Error(
          `Wrong answer type was given to the takeUserAnswers function`
      );
  }
};

const questionView = (state, callback, timerId) => {
  const currentQuestion = state.questions[state.currentQuestion];
  const eventName = eventNames.get(currentQuestion.type);

  const questionTemplate = `<section class="game">
    ${getQuestionTemplate(currentQuestion)}
    ${currentStats(state.answers, state.questions.length)}
  </section>`;

  const handler = (evt) => {
    const userAnswers = takeUserAnswers(evt, currentQuestion.type);
    const isCurrentAnswerCorrect = isAnswerCorrect(
        currentQuestion,
        userAnswers
    );

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
