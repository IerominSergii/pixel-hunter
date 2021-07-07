import AbstractView from "../views/abstract-view";

export default class QuestionTripleView extends AbstractView {
  constructor(options, callback) {
    super();
    this.options = options;
    this.onClick = callback;
    this._userChoice = (evt) => this._userChoiceHandler(evt);
  }

  _getOptionTemplate(option, index) {
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
    ${this.options.map(this._getOptionTemplate).join(``)}  
  </form>`;
  }

  _userChoiceHandler(evt) {
    const index = evt.target.getAttribute(`data-answer`);
    this.onClick(this.options[index].thisIs === `paint`);
  }

  _bind(element) {
    element
      .querySelector(`.game__content`)
      .addEventListener(`click`, this._userChoice);
  }
}
