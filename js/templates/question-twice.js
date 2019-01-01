import {createElement} from "../util/util";

const TOTAL_QUESTIONS_AMOUNT = 2;

export default (options, callback) => {
  const getOptionTemplate = (option, index) => {
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
  };

  const getQuestionTemplate = (questionOptions) => {
    return `<p class="game__task">
    Угадайте для каждого изображения фото или рисунок?
  </p>
  <form class="game__content">
    ${questionOptions.map(getOptionTemplate).join(``)}
  </form>`;
  };

  const handler = () => {
    let isCorrect = false;
    const checkedInputs = document.querySelectorAll(`input:checked`);
    const answerValues = Array.from(checkedInputs).map((input) => {
      return input.value;
    });

    if (answerValues.length === TOTAL_QUESTIONS_AMOUNT) {
      const initialResult = false;

      isCorrect = answerValues.reduce((result, answer, index) => {
        return result && answer === options[index];
      }, initialResult);
      callback(isCorrect);
    }
  };

  const questionElement = createElement(getQuestionTemplate(options));
  questionElement
    .querySelector(`.game__content`)
    .addEventListener(`change`, handler);

  return questionElement;
};
