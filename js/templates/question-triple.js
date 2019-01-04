import {createElement} from "../util/util";

export default (options, callback) => {
  const getOptionTemplate = (option, index) => {
    return `<div class="game__option">
    <img
      src="${option.src}"
      alt="Option ${index + 1}"
      data-answer="${index}"
      width="304"
      height="455"
    />
  </div>`;
  };

  const getQuestionTemplate = (questionOptions) => {
    return `<p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
    ${questionOptions.map(getOptionTemplate).join(``)}  
  </form>`;
  };

  const gameContentClickHandler = (evt) => {
    const index = evt.target.getAttribute(`data-answer`);
    callback(options[index].thisIs === `paint`);
  };

  const questionElement = createElement(getQuestionTemplate(options));
  questionElement
    .querySelector(`.game__content`)
    .addEventListener(`click`, gameContentClickHandler);

  return questionElement;
};
