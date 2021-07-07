import AbstractView from "../../views/abstract-view";
import HeaderView from "../../views/header-view";
import {answersTypes} from "../../configuration";
import {createElement} from "../../util/util";

const SHOW_RESULTS = 4;

export default class StatsView extends AbstractView {
  constructor(name, gamesResultsData) {
    super();
    this.name = name;
    this.gamesResultsData = gamesResultsData.reverse().slice(0, SHOW_RESULTS);
    this._playerTemplate = (result) => this._getPlayerTemplate(result);
  }

  _getTitleTemplate(gameResults) {
    return `<h2 class="result__title">${
      gameResults.results.final.value === -1 ? `Проиграл.` : `Победа!`
    }</h2>`;
  }

  _getAnswersTemplate(gameResults) {
    return `<ul class="stats">
    ${gameResults.answers
      .map((answer) => {
        return `<li class="stats__result stats__result--${
          answersTypes[answer.toUpperCase()]
        }"></li>`;
      })
      .join(``)}
  </ul>`;
  }

  _getDetailsTemplate(gameResults) {
    if (gameResults.results.final.value === -1) {
      return ``;
    }

    const {results, lives} = gameResults;
    const {fast, life, slow} = results;

    return `<tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">
        1 <span class="stats__result stats__result--fast"></span>
      </td>
      <td class="result__points">${fast.amount} × 50</td>
      <td class="result__total">${fast.value}</td>
      </tr>
      <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">
        2 <span class="stats__result stats__result--alive"></span>
      </td>
      <td class="result__points">${lives} × 50</td>
      <td class="result__total">${life.value}</td>
      </tr>
      <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">
        3 <span class="stats__result stats__result--slow"></span>
      </td>
      <td class="result__points">${slow.amount} × 50</td>
      <td class="result__total">-${slow.value}</td>
    </tr>`;
  }

  _getPlayerTemplate(gameResults) {
    const {results, name} = gameResults;
    const {final, total} = results;

    return `<table class="result__table">
    <tr>
      <td class="result__number">1. ${name}</td>
      <td colspan="2">
      ${this._getAnswersTemplate(gameResults)}
      </td>
      <td class="result__points">${
  final.value === -1 ? final.value : total.amount
} × 100</td>
      <td class="result__total">${
  final.value === -1 ? final.value : total.value
}</td>
    </tr>
    ${this._getDetailsTemplate(gameResults)}
    <tr>
      <td colspan="5" class="result__total  result__total--final">${
  final.value
}</td>
    </tr>
  </table>`;
  }

  get template() {
    return this.gamesResultsData.map((gameResults) => {
      return `${this._getTitleTemplate(gameResults)}
      ${this._playerTemplate(gameResults)}`;
    });
  }

  onBackButtonClick() {}

  _render() {
    const statsContainer = createElement();

    statsContainer.appendChild(new HeaderView(this.onBackButtonClick).element);
    statsContainer.appendChild(
        createElement(this.template, `section`, `result`)
    );

    return statsContainer;
  }
}
