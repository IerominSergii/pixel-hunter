import AbstractView from "../views/abstract-view";
import startGame from "../game/start-game";

export default class IntroView extends AbstractView {
  get template() {
    return `<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`;
  }

  asteriskClickHandler() {
    startGame();
  }

  bind(element) {
    const asterisk = element.querySelector(`.intro__asterisk`);
    asterisk.addEventListener(`click`, this.asteriskClickHandler);
  }
}
