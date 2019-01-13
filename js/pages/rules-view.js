import AbstractView from "../views/abstract-view";
import {createElement} from "../util/util";

export default class RulesView extends AbstractView {
  constructor() {
    super();
    this.onSubmit = (evt) => {
      this.submitFormHandler(evt);
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

  enableRulesButton(input, button) {
    const rulesInputInputHandler = () => {
      if (input.value) {
        button.removeAttribute(`disabled`);
      } else {
        button.setAttribute(`disabled`, `disabled`);
      }
    };

    input.addEventListener(`input`, rulesInputInputHandler);
  }

  render() {
    return createElement(this.template, `section`, `rules`);
  }

  submitFormCallback() {}

  submitFormHandler() {
    const rulesInput = this._element.querySelector(`.rules__input`);
    rulesInput.value = ``;
    this.submitFormCallback();
  }

  bind(element) {
    const rulesForm = element.querySelector(`.rules__form`);
    const rulesInput = rulesForm.querySelector(`.rules__input`);
    const rulesButton = rulesForm.querySelector(`.rules__button`);

    this.enableRulesButton(rulesInput, rulesButton);

    rulesForm.addEventListener(`submit`, this.onSubmit);
    rulesInput.focus();
  }
}
