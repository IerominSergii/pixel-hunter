import AbstractView from "./abstract-view";
import {DEFAULT_LIVES} from "./../game/configuration";
import BackButton from "../views/back-button-view";
import {createElement} from "../util/util";

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  getTimerTemplate() {
    const {timer} = this.state;

    return `<div class="game__timer">${timer}</div>`;
  }

  getLivesTemplate() {
    const {lives} = this.state;

    return `<div class="game__lives">
    ${new Array(lives)
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
  
      ${new Array(DEFAULT_LIVES - lives)
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
    const {isGameActive} = this.state;

    return `${isGameActive ? this.getTimerTemplate() : ``}
    ${isGameActive ? this.getLivesTemplate() : ``}`;
  }

  render() {
    return createElement(this.template, `header`, `header`);
  }

  onBackButtonClick() {}

  get element() {
    if (this._element) {
      return this._element;
    }

    const backButton = new BackButton(this.onBackButtonClick);
    backButton.onButtonClick = this.onBackButtonClick;
    this._element = this.render();
    this._element.prepend(backButton.element);

    return this._element;
  }
}
