import AbstractView from "../views/abstract-view";

export default class QuestionSingleView extends AbstractView {
  constructor(option, callback) {
    super();
    this.option = option;
    this.callback = callback;
    this.onChoice = () => this.userChoiceHandler();
  }

  get template() {
    return `<p class="game__task">Угадай, фото или рисунок?</p>
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img
        src="${this.option.src}"
        alt="${this.option.alt}"
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

  userChoiceHandler() {
    const userAnswer = document.querySelector(`input:checked`).value;
    this.callback(userAnswer === this.option.thisIs);
  }

  bind(element) {
    element
      .querySelector(`.game__content`)
      .addEventListener(`change`, this.onChoice);
  }
}
