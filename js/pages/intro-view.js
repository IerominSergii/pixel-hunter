import AbstractView from "../views/abstract-view";
import {createElement} from "../util/util";

export default class IntroView extends AbstractView {
  get template() {
    return `<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>`;
  }

  asteriskClickHandler() {}

  render() {
    return createElement(this.template, `section`, `intro`);
  }

  bind(element) {
    const asterisk = element.querySelector(`.intro__asterisk`);
    asterisk.addEventListener(`click`, this.asteriskClickHandler);
  }
}
