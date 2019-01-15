import AbstractView from "./abstract-view";
import {createElement} from "../util/util";
import QuestionSingle from "../templates/question-single-view";
import CurrentStats from "../templates/current-stats-view";
import QuestionTwice from "../templates/question-twice-view";
import QuestionTriple from "../templates/question-triple-view";

export default class Question extends AbstractView {
  constructor(state, callback) {
    super();
    this.state = state;
    this.answers = this.state.answers;
    this.questions = this.state.questions;
    this.currentQuestion = this.state.questions[this.state.currentQuestion];
    this.type = this.currentQuestion.type;
    this.options = this.currentQuestion.options;

    this.userChoiceHandler = () => callback();
  }

  getQuestionView(answerType, callback) {
    switch (answerType) {
      case `single`:
        return new QuestionSingle(this.options, callback);
      case `twice`:
        return new QuestionTwice(this.options, callback);
      case `triple`:
        return new QuestionTriple(this.options, callback);
      default:
        throw new Error(`Unknown question type`);
    }
  }

  render() {
    const questionElement = createElement(``, `section`, `game`);
    const currentStats = new CurrentStats(this.answers, this.questions.length);
    const currentQuestionView = this.getQuestionView(
        this.type,
        this.userChoiceHandler
    );

    questionElement.appendChild(currentQuestionView.element);
    questionElement.appendChild(currentStats.element);

    return questionElement;
  }
}
