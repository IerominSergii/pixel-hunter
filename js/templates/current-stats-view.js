import AbstractView from "../views/abstract-view";

export default class CurrentStats extends AbstractView {
  constructor(answers, questionsAmount) {
    super();
    this.answers = answers;
    this.questionsAmount = questionsAmount;
  }

  renderAnswerStats(answer) {
    return `<li class="stats__result stats__result--${answer}"></li>`;
  }

  get template() {
    return `<ul class="stats">
  ${this.answers.map(this.renderAnswerStats).join(``)}
  ${new Array(this.questionsAmount - this.answers.length)
    .fill(`<li class="stats__result stats__result--unknown"></li>`)
    .join(``)}
</ul>`;
  }
}
