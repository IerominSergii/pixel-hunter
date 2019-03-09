import AbstractView from "../../views/abstract-view";
import HeaderView from "../../views/header-view";
import {answersTypes} from "../../configuration";
import {createElement} from "../../util/util";

const SHOW_RESULTS = 2;

export default class StatsView extends AbstractView {
  constructor(name, data) {
    super();
    this.name = name;
    this.data = data.slice(SHOW_RESULTS);
    this.data[0].firstResult = true;
    this._playerTemplate = (result) => this._getPlayerTemplate(result);
  }

  _getTitleTemplate(data) {
    return `<h2 class="result__title">${
      data.results.final.value === -1 ? `Проиграл.` : `Победа!`
    }</h2>`;
  }

  _getAnswersTemplate(data) {
    return `<ul class="stats">
    ${data.answers
      .map((answer) => {
        return `<li class="stats__result stats__result--${
          answersTypes[answer.toUpperCase()]
        }"></li>`;
      })
      .join(``)}
  </ul>`;
  }

  _getDetailsTemplate(data) {
    if (data.results.final.value === -1) {
      return ``;
    }

    return `<tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">
        1 <span class="stats__result stats__result--fast"></span>
      </td>
      <td class="result__points">${data.results.fast.amount} × 50</td>
      <td class="result__total">${data.results.fast.value}</td>
      </tr>
      <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">
        2 <span class="stats__result stats__result--alive"></span>
      </td>
      <td class="result__points">${data.lives} × 50</td>
      <td class="result__total">${data.results.life.value}</td>
      </tr>
      <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">
        3 <span class="stats__result stats__result--slow"></span>
      </td>
      <td class="result__points">${data.results.slow.amount} × 50</td>
      <td class="result__total">-${data.results.slow.value}</td>
    </tr>`;
  }

  _getPlayerTemplate(data) {
    return `<table class="result__table">
    <tr>
      <td class="result__number">1. ${data.name}</td>
      <td colspan="2">
      ${this._getAnswersTemplate(data)}
      </td>
      <td class="result__points">${
  data.results.final.value === -1
    ? data.results.final.value
    : data.results.total.amount
} × 100</td>
      <td class="result__total">${
  data.results.final.value === -1
    ? data.results.final.value
    : data.results.total.value
}</td>
    </tr>
    ${data.firstResult ? this._getDetailsTemplate(data) : ``}
    <tr>
      <td colspan="5" class="result__total  result__total--final">${
  data.results.final.value
}</td>
    </tr>
  </table>`;
  }

  get template() {
    return this.data
      .map((it) => {
        return `${this._getTitleTemplate(it)}
      ${this._playerTemplate(it)}`;
      })
      .reverse();
  }

  onBackButtonClick() {}

  render() {
    const statsContainer = createElement();

    statsContainer.appendChild(new HeaderView(this.onBackButtonClick).element);
    statsContainer.appendChild(
        createElement(this.template, `section`, `result`)
    );

    return statsContainer;
  }
}
