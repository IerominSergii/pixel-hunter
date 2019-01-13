import AbstractView from "./abstract-view";
import {createElement} from "../util/util";
import QuestionSingle from "../templates/question-single-view";
import CurrentStats from "../templates/current-stats-view";
import QuestionTwice from "../templates/question-twice-view";
import QuestionTriple from "../templates/question-triple-view";

export default class Question extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.answers = this.state.answers;
    this.questions = this.state.questions;
    this.currentQuestion = this.state.questions[this.state.currentQuestion];
    this.type = this.currentQuestion.type;
    this.options = this.currentQuestion.options;
  }

  getQuestionView(answerType) {
    switch (answerType) {
      case `single`:
        return new QuestionSingle(this.options);
      case `twice`:
        return new QuestionTwice(this.options);
      case `triple`:
        return new QuestionTriple(this.options);
      default:
        throw new Error(`Unknown question type`);
    }
  }

  userChoiceHandler() {}

  render() {
    const questionElement = createElement(``, `section`, `game`);
    const currentStats = new CurrentStats(this.answers, this.questions.length);
    const currentQuestionView = this.getQuestionView(this.type);
    currentQuestionView.userChoiceHandler = this.userChoiceHandler.bind(this);

    questionElement.appendChild(currentQuestionView.element);
    questionElement.appendChild(currentStats.element);

    return questionElement;
  }
}
