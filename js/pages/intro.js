import {createElement} from "./../util/util";
import startGame from "../game/start-game";

const introTemplate = `<section class="intro">
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>`;

const introScreen = createElement(introTemplate);

const asterisk = introScreen.querySelector(`.intro__asterisk`);

const asteriskClickHandler = () => {
  startGame();
};

asterisk.addEventListener(`click`, asteriskClickHandler);

export default introScreen;
