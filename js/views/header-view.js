import AbstractView from "./abstract-view";
import BackButton from "../views/back-button-view";
import {createElement} from "../util/util";

const TOTAL_LIVES_AMOUNT = 3;

export default class HeaderView extends AbstractView {
  constructor(callback, timer = false, lives = false) {
    super();
    this.timer = timer;
    this.lives = lives;
    this.onBackButtonClick = callback;
  }

  getTimerTemplate() {
    return this.timer !== false
      ? `<div class="game__timer">${this.timer}</div>`
      : ``;
  }

  getLivesTemplate() {
    return this.lives !== false
      ? `<div class="game__lives">
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
  
      ${new Array(TOTAL_LIVES_AMOUNT - this.lives)
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
  </div>`
      : ``;
  }

  get template() {
    return `${this.getTimerTemplate()}
    ${this.getLivesTemplate()}`;
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
