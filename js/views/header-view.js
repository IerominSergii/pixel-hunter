import AbstractView from "./abstract-view";
import BackButton from "../views/back-button-view";
import {createElement} from "../util/util";

export default class HeaderView extends AbstractView {
  constructor(timer, lives, isGameActive, defaultLives, callback) {
    super();
    this.timer = timer;
    this.lives = lives;
    this.isGameActive = isGameActive;
    this.defaultLives = defaultLives;
    this.onBackButtonClick = callback;
  }

  getTimerTemplate() {
    return `<div class="game__timer">${this.timer}</div>`;
  }

  getLivesTemplate() {
    return `<div class="game__lives">
    ${new Array(this.lives)
      .fill(
          `<img
    src="img/heart__full.svg"
    class="game__heart"
    alt="Life"
    width="31"
    height="27"
  />`
      )
      .join(``)}
  
      ${new Array(this.defaultLives - this.lives)
        .fill(
            `<img
      src="img/heart__empty.svg"
      class="game__heart"
      alt=" Missed Life"
      width="31"
      height="27"
    />`
        )
        .join(``)}
  </div>`;
  }

  get template() {
    return `${this.isGameActive ? this.getTimerTemplate() : ``}
    ${this.isGameActive ? this.getLivesTemplate() : ``}`;
  }

  render() {
    return createElement(this.template, `header`, `header`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }

    const backButton = new BackButton(this.onBackButtonClick);
    this._element = this.render();
    this._element.prepend(backButton.element);

    return this._element;
  }
}
