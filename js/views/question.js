import {questionsType} from "./../game/configuration";

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
      throw new Error(`Wrong question type in question.js`);
    }
  }
};

const questionView = (state) => {
  const currentQuestion = state.questions[state.currentQuestion];

  return `<section class="game">
    ${getQuestionTemplate(currentQuestion)}
    ${currentStats(state.answers, state.questions.length)}
  </section>`;
};

export default questionView;
