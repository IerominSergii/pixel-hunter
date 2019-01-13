import AbstractView from "../views/abstract-view";

export default class QuestionTriple extends AbstractView {
  constructor(options) {
    super();
    this.options = options;
    this.onClick = (evt) => {
      this.gameContentClickHandler(evt);
    };
  }

  getOptionTemplate(option, index) {
    return `<div class="game__option">
    <img
      src="${option.src}"
      alt="Option ${index + 1}"
      data-answer="${index}"
      width="304"
      height="455"
    />
  </div>`;
  }

  get template() {
    return `<p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
    ${this.options.map(this.getOptionTemplate).join(``)}  
  </form>`;
  }

  userChoiceHandler() {}

  gameContentClickHandler(evt) {
    const index = evt.target.getAttribute(`data-answer`);
    this.userChoiceHandler(this.options[index].thisIs === `paint`);
  }

  bind(element) {
    element
      .querySelector(`.game__content`)
      .addEventListener(`click`, this.onClick);
  }
}
