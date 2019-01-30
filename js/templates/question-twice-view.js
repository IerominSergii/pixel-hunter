import AbstractView from "../views/abstract-view";

export default class QuestionTwice extends AbstractView {
  constructor(options, callback) {
    super();
    this.options = options;
    this.userChoiceHandler = callback;
    this.onChange = () => {
      this.gameContentChangeHandler();
    };
  }

  getOptionTemplate(option, index) {
    return `<div class="game__option">
      <img
        src="${option.src}"
        alt="Option 1"
        width="468"
        height="458"
      />
      <label class="game__answer game__answer--photo">
        <input
          class="visually-hidden"
          name="question ${index + 1}"
          type="radio"
          value="photo"
        />
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input
          class="visually-hidden"
          name="question ${index + 1}"
          type="radio"
          value="paint"
        />
        <span>Рисунок</span>
      </label>
    </div>`;
  }

  get template() {
    return `<p class="game__task">
    Угадайте для каждого изображения фото или рисунок?
  </p>
  <form class="game__content">
    ${this.options.map(this.getOptionTemplate).join(``)}
  </form>`;
  }

  gameContentChangeHandler() {
    const answerValues = Array.from(
        document.querySelectorAll(`input:checked`)
    ).map((input) => {
      return input.value;
    });

    if (answerValues.length === this.options.length) {
      const initialResult = answerValues.every((answer, index) => {
        return answer === this.options[index].thisIs;
      });

      this.userChoiceHandler(initialResult);
    }
  }

  bind(element) {
    element
      .querySelector(`.game__content`)
      .addEventListener(`change`, this.onChange);
  }
}
