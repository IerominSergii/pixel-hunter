import {createElement} from "../util/util";
import QuestionSingle from "../templates/question-single-view";
import CurrentStats from "../templates/current-stats-view";
import QuestionTwice from "../templates/question-twice-view";
import QuestionTriple from "../templates/question-triple-view";

const SINGLE_OPTION_INDEX = 0;

const getQuestionView = (type, options, callback) => {
  switch (type) {
    case `single`:
      return new QuestionSingle(options[SINGLE_OPTION_INDEX], callback);
    case `twice`:
      return new QuestionTwice(options, callback);
    case `triple`:
      return new QuestionTriple(options, callback);
    default:
      throw new Error(`Unknown question type`);
  }
};

export default (type, options, answers, questions, callback) => {
  const questionElement = createElement(``, `section`, `game`);
  const currentStatsView = new CurrentStats(answers, questions.length);
  const currentQuestionView = getQuestionView(type, options, callback);

  questionElement.appendChild(currentQuestionView.element);
  questionElement.appendChild(currentStatsView.element);

  return questionElement;
};
