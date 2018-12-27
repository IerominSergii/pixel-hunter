import {questionsType} from "./../game/configuration";

import questionSingle from "./../templates/question-single";
import questionTwice from "./../templates/question-twice";
import questionTriple from "./../templates/question-triple";

import currentStats from "./../templates/current-stats";
// import {createElement} from "../util/util";

const templates = new Map([
  [questionsType.SINGLE, questionSingle],
  [questionsType.TWICE, questionTwice],
  [questionsType.TRIPLE, questionTriple]
]);

const getQuestionTemplate = (question) => {
  return templates.get(question.type)(question);
};

// const bindHandler = (type, element, callback, timerId) => {
//   const handler = (evt) => {
//     clearInterval(timerId);
//     callback(evt);
//   };

//   const gameOption = element.querySelector(`.game__content`);
//   if (type === questionsType.TRIPLE) {
//     gameOption.addEventListener(`click`, handler);
//   } else {
//     gameOption.addEventListener(`change`, handler);
//   }
// };

const questionView = (state) => {
  const currentQuestion = state.questions[state.currentQuestion];

  //   const questionTemplate = `<section class="game">
  //   ${getQuestionTemplate(currentQuestion)}
  //   ${currentStats(state.answers, state.questions.length)}
  // </section>`;

  // const questionElement = createElement(questionTemplate);
  // bindHandler();

  // return questionElement;
  return `<section class="game">
  ${getQuestionTemplate(currentQuestion)}
  ${currentStats(state.answers, state.questions.length)}
</section>`;
};

export default questionView;
