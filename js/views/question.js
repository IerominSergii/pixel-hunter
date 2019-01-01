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

const questionView = (state, callback) => {
  const currentQuestion = state.questions[state.currentQuestion];
  const {type} = currentQuestion;

  const statsElement = createElement(
      currentStats(state.answers, state.questions.length)
  );

  const questionElement = createElement(``, `section`, `game`);
  questionElement.appendChild(
      templates[type](currentQuestion.options, callback)
  );
  questionElement.appendChild(statsElement);

  return questionElement;
};

export default questionView;
