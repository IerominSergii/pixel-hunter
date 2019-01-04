import {DEFAULT_LIVES} from "../game/configuration";

const renderGoBackButton = () => {
  return `<button class="back">
  <span class="visually-hidden">Вернуться к началу</span>
  <svg
    class="icon"
    width="45"
    height="45"
    viewBox="0 0 45 45"
    fill="#000000"
  >
    <use xlink:href="img/sprite.svg#arrow-left"></use>
  </svg>
  <svg
    class="icon"
    width="101"
    height="44"
    viewBox="0 0 101 44"
    fill="#000000"
  >
    <use xlink:href="img/sprite.svg#logo-small"></use>
  </svg>
</button>`;
};

const getTimerTemplate = (time) => {
  return `<div class="game__timer">${time}</div>`;
};

const getLivesTemplate = (lives) => {
  return `<div class="game__lives">
  ${new Array(lives)
    .fill(
        `<img
  src="img/heart__full.svg"
  class="game__heart"
  alt="Life"
  width="31"
  height="27"
/>`
    )
    .join(``)}

    ${new Array(DEFAULT_LIVES - lives)
      .fill(
          `<img
    src="img/heart__empty.svg"
    class="game__heart"
    alt=" Missed Life"
    width="31"
    height="27"
  />`
      )
      .join(``)}
</div>`;
};

export default (state) => {
  const {isGameActive} = state;

  return `<header class="header">
  ${renderGoBackButton()}
  ${isGameActive ? getTimerTemplate(state.timer) : ``}
  ${isGameActive ? getLivesTemplate(state.lives) : ``}
  </header>`;
};
