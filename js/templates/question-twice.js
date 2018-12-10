const renderOption = (option, index) => {
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

export default (question) => {
  return `<p class="game__task">
    Угадайте для каждого изображения фото или рисунок?
  </p>
  <form class="game__content">
    ${question.options.map(renderOption).join(``)}
  </form>`;
};
