import {createElement} from "../util/util";

const SINGLE_OPTION_INDEX = 0;

export default (options, callback) => {
  const questionOption = options[SINGLE_OPTION_INDEX];

  const getTemplate = (option) => {
    return `<p class="game__task">Угадай, фото или рисунок?</p>
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img
        src="${option.src}"
        alt="${option.alt}"
        width="705"
        height="455"
      />
      <label class="game__answer  game__answer--photo">
        <input
          class="visually-hidden"
          name="question1"
          type="radio"
          value="photo"
        />
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input
          class="visually-hidden"
          name="question1"
          type="radio"
          value="paint"
        />
        <span>Рисунок</span>
      </label>
    </div>
  </form>`;
  };

  const gameContentChangeHandler = () => {
    const userAnswer = document.querySelector(`input:checked`).value;
    callback(userAnswer === options[SINGLE_OPTION_INDEX].thisIs);
  };

  const questionElement = createElement(getTemplate(questionOption));
  questionElement
    .querySelector(`.game__content`)
    .addEventListener(`change`, gameContentChangeHandler);

  return questionElement;
};
