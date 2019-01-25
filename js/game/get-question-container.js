import {createElement} from "../util/util";
import CurrentStats from "../templates/current-stats-view";
import getQuestionElement from "./get-question-element";

export default (type, options, answers, questions, callback) => {
  const questionContainerElement = createElement(``, `section`, `game`);

  questionContainerElement.appendChild(
      getQuestionElement(type, options, callback)
  );
  questionContainerElement.appendChild(
      new CurrentStats(answers, questions.length).element
  );

  return questionContainerElement;
};
