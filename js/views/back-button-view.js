import AbstractView from "./abstract-view";
import {createElement} from "../util/util";

export default class BackButton extends AbstractView {
  get template() {
    return `<span class="visually-hidden">Вернуться к началу</span>
    <svg
      class="icon"
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="#000000"
    >
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg
      class="icon"
      width="101"
      height="44"
      viewBox="0 0 101 44"
      fill="#000000"
    >
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>`;
  }

  onButtonClick() {}

  render() {
    return createElement(this.template, `button`, `back`);
  }

  bind() {
    this._element.addEventListener(`click`, this.onButtonClick);
  }
}
