export default (question) => {
  const option = question.options[0];

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