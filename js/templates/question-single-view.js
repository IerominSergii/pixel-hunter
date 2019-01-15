import AbstractView from "../views/abstract-view";

export default class QuestionSingle extends AbstractView {
  constructor(options, callback) {
    super();
    this.options = options;
    this.SINGLE_OPTION_INDEX = 0;
    this.questionOption = options[this.SINGLE_OPTION_INDEX];
    this.gameContentChangeHandler.bind(this);
    this.onChange = () => {
      this.gameContentChangeHandler();
    };
    this.userChoiceHandler = callback;
  }

  get template() {
    return `<p class="game__task">Угадай, фото или рисунок?</p>
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img
        src="${this.questionOption.src}"
        alt="${this.questionOption.alt}"
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
  }

  gameContentChangeHandler() {
    const userAnswer = document.querySelector(`input:checked`).value;
    this.userChoiceHandler(
        userAnswer === this.options[this.SINGLE_OPTION_INDEX].thisIs
    );
  }

  bind(element) {
    element
      .querySelector(`.game__content`)
      .addEventListener(`change`, this.onChange);
  }
}
