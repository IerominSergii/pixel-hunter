import AbstractView from "../views/abstract-view";
import {createElement} from "../util/util";

export default class RulesView extends AbstractView {
  constructor(callback) {
    super();
    this.submitFormCallback = callback;
    this.onSubmit = (evt) => {
      this._submitFormHandler(evt);
    };
  }

  get template() {
    return `<h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>
        Угадай 10 раз для каждого изображения фото
        <img
          class="rules__icon"
          src="img/icon-photo.png"
          width="32"
          height="31"
          alt="Фото"
        />
        или рисунок
        <img
          class="rules__icon"
          src="img/icon-paint.png"
          width="32"
          height="31"
          alt="Рисунок"
        />
      </li>
    
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя" autofocus />
      <button class="rules__button continue" type="submit" disabled>
        Go!
      </button>
    </form>`;
  }

  _enableRulesButton(input, button) {
    const rulesInputInputHandler = () => {
      button.disabled = input.value ? false : true;
    };

    input.addEventListener(`input`, rulesInputInputHandler);
  }

  render() {
    return createElement(this.template, `section`, `rules`);
  }

  _submitFormHandler() {
    const rulesInput = this._element.querySelector(`.rules__input`);
    this._element.querySelector(`.rules__button`).disabled = true;

    this.submitFormCallback();
    rulesInput.value = ``;
    rulesInput.focus();
  }

  bind(element) {
    const rulesForm = element.querySelector(`.rules__form`);
    const rulesInput = rulesForm.querySelector(`.rules__input`);
    const rulesButton = rulesForm.querySelector(`.rules__button`);

    this._enableRulesButton(rulesInput, rulesButton);

    rulesForm.addEventListener(`submit`, this.onSubmit);
    rulesInput.focus();
  }
}
