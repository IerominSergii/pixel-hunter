import AbstractView from "../views/abstract-view";
import {answersTypes} from "../game/configuration";

export default class StatsView extends AbstractView {
  constructor(name, answers, lives, totalResult, bonuses) {
    super();
    this.name = name;
    this.answers = answers;
    this.lives = lives;
    this.totalResult = totalResult;
    this.bonuses = bonuses;
    this._playerTemplate = () => this._getPlayerTemplate();
  }

  _getTitleTemplate() {
    return `<h2 class="result__title">${
      this.totalResult === -1 ? `Проиграл.` : `Победа!`
    }</h2>`;
  }

  _getAnswersTemplate() {
    return `<ul class="stats">
    ${this.answers
      .map((answer) => {
        return `<li class="stats__result stats__result--${
          answersTypes[answer.toUpperCase()]
        }"></li>`;
      })
      .join(``)}
  </ul>`;
  }

  _getDetailsTemplate() {
    if (this.totalResult === -1) {
      return ``;
    }

    return `<tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">
        1 <span class="stats__result stats__result--fast"></span>
      </td>
      <td class="result__points">${this.bonuses.fast.amount} × 50</td>
      <td class="result__total">${this.bonuses.fast.value}</td>
      </tr>
      <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">
        2 <span class="stats__result stats__result--alive"></span>
      </td>
      <td class="result__points">${this.bonuses.life.amount} × 50</td>
      <td class="result__total">${this.bonuses.life.value}</td>
      </tr>
      <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">
        2 <span class="stats__result stats__result--slow"></span>
      </td>
      <td class="result__points">${this.bonuses.slow.amount} × 50</td>
      <td class="result__total">-${this.bonuses.slow.value}</td>
    </tr>`;
  }

  _getPlayerTemplate() {
    return `<table class="result__table">
    <tr>
      <td class="result__number">1. ${this.name}</td>
      <td colspan="2">
      ${this._getAnswersTemplate()}
      </td>
      <td class="result__points">${this.answers.length} × 100</td>
      <td class="result__total">${this.totalResult}</td>
    </tr>
    ${this._getDetailsTemplate()}
    <tr>
      <td colspan="5" class="result__total  result__total--final">${
  this.totalResult
}</td>
    </tr>
  </table>`;
  }

  get template() {
    return `<section class="result">
    ${this._getTitleTemplate()}
    ${this._playerTemplate()}
  </section>`;
  }
}
