import {createElement} from "./../util/util";

const rulesTemplate = `<section class="rules">
<h2 class="rules__title">Правила</h2>
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
</form>
</section>`;

export default (callback, headerElement) => {
  const rulesScreen = createElement(rulesTemplate);

  const rulesForm = rulesScreen.querySelector(`.rules__form`);
  const rulesInput = rulesForm.querySelector(`.rules__input`);
  const rulesButton = rulesForm.querySelector(`.rules__button`);

  const rulesInputInputHandler = () => {
    if (rulesInput.value) {
      rulesButton.removeAttribute(`disabled`);
    } else {
      rulesButton.setAttribute(`disabled`, `disabled`);
    }
  };

  const submitFormHandler = () => {
    callback();
  };

  rulesInput.addEventListener(`input`, rulesInputInputHandler);
  rulesForm.addEventListener(`submit`, submitFormHandler);
  rulesInput.focus();

  rulesScreen.prepend(headerElement);

  return rulesScreen;
};
