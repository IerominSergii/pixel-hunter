import AbstractView from "../views/abstract-view";
import countPoints from "../game/count-points";
import {
  ANSWERS_TYPES,
  ANSWER_POINTS,
  SAVED_LIFE_VALUE
} from "../game/configuration";

const FAST_BONUS = 50;
const SLOW_BONUS = 50;

const getTotalResults = (answers) => {
  const correctAnswers = answers.filter((answer) => {
    return answer !== ANSWERS_TYPES.WRONG && answer !== ANSWERS_TYPES.UNKNOWN;
  });

  return correctAnswers.length * ANSWER_POINTS.correct;
};

const getFastBonus = (fastAnswersAmount) => {
  return fastAnswersAmount * FAST_BONUS;
};

const getSlowBonus = (slowAnswersAmount) => {
  return slowAnswersAmount * SLOW_BONUS;
};

const getLivesBonus = (lives) => {
  return lives * SAVED_LIFE_VALUE;
};

const getFastAnswers = (answers) => {
  return answers.filter((answer) => {
    return answer === ANSWERS_TYPES.FAST;
  });
};

const getSlowAnswers = (answers) => {
  return answers.filter((answer) => {
    return answer === ANSWERS_TYPES.SLOW;
  });
};

export default class StatsView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.answers = this.state.answers;
    this.lives = this.state.lives;
    this.questions = this.state.questions;
    this.totalResultFinal = countPoints(
        this.answers,
        this.lives,
        this.questions.length
    );
    this.fastAnswers = getFastAnswers(this.answers);
    this.slowAnswers = getSlowAnswers(this.answers);
  }

  _getTitleTemplate() {
    return `<h2 class="result__title">${
      this.totalResultFinal === -1 ? `Проиграл.` : `Победа!`
    }</h2>`;
  }

  _getAnswersTemplate() {
    return `<ul class="stats">
    ${this.answers
      .map((answer) => {
        return `<li class="stats__result stats__result--${
          ANSWERS_TYPES[answer.toUpperCase()]
        }"></li>`;
      })
      .join(``)}
  </ul>`;
  }

  _getDetailsTemplate() {
    const detailsTemplate = `<tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">
        1 <span class="stats__result stats__result--fast"></span>
      </td>
      <td class="result__points">${this.fastAnswers.length} × 50</td>
      <td class="result__total">${getFastBonus(this.fastAnswers.length)}</td>
      </tr>
      <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">
        2 <span class="stats__result stats__result--alive"></span>
      </td>
      <td class="result__points">${this.lives} × 50</td>
      <td class="result__total">${getLivesBonus(this.lives)}</td>
      </tr>
      <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">
        2 <span class="stats__result stats__result--slow"></span>
      </td>
      <td class="result__points">${this.slowAnswers.length} × 50</td>
      <td class="result__total">-${getSlowBonus(this.slowAnswers.length)}</td>
    </tr>`;

    return this.totalResultFinal !== -1 ? detailsTemplate : ``;
  }

  _getPlayerTemplate() {
    const {answers, name} = this.state;

    return `<table class="result__table">
    <tr>
      <td class="result__number">1. ${name}</td>
      <td colspan="2">
      ${this._getAnswersTemplate()}
      </td>
      <td class="result__points">${answers.length} × 100</td>
      <td class="result__total">${getTotalResults(answers)}</td>
    </tr>
    ${this._getDetailsTemplate()}
    <tr>
      <td colspan="5" class="result__total  result__total--final">${
  this.totalResultFinal
}</td>
    </tr>
  </table>`;
  }

  get template() {
    return `<section class="result">
    ${this._getTitleTemplate()}
    ${this._getPlayerTemplate()}
  </section>`;
  }
}
