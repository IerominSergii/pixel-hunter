"use strict";

const keyButtons = {
  LEFT: 37,
  RIGHT: 39
};

const body = document.body;
const main = body.querySelector(`#main`);
const intro = body.querySelector(`#intro`);
const greeting = body.querySelector(`#greeting`);
const rules = body.querySelector(`#rules`);
const game1 = body.querySelector(`#game-1`);
const game2 = body.querySelector(`#game-2`);
const game3 = body.querySelector(`#game-3`);
const stats = body.querySelector(`#stats`);

const screens = [intro, greeting, rules, game1, game2, game3, stats];
const START_SCREEN = 2;

const screensState = {
  current: START_SCREEN
};

//  <--- start arrows buttons section --->
const arrowsInnerHtml = `<div class="arrows__wrap">
<style>
  .arrows__wrap {
    position: absolute;
    top: 95px;
    left: 50%;
    margin-left: -56px;
  }
  .arrows__btn {
    background: none;
    border: 2px solid black;
    padding: 5px 20px;
  }
</style>
<button class="arrows__btn"><-</button>
<button class="arrows__btn">-></button>
</div>`;

body.insertAdjacentHTML(`beforeEnd`, arrowsInnerHtml);

const buttons = document.querySelectorAll(`.arrows__btn`);
const prevButton = buttons[0];
const nextButton = buttons[1];
//  <--- end arrows buttons section --->

// <--- start switchScreen section --->
// functions
const removeChildren = (parentElement) => {
  while (parentElement.lastChild) {
    parentElement.removeChild(parentElement.lastChild);
  }
};

const switchScreens = (evt) => {
  const {current} = screensState;
  let newCurrentScreen = current;
  const eventTarget = evt.target;

  if (evt.keyCode === keyButtons.LEFT || eventTarget === prevButton) {
    // check the screens limit
    newCurrentScreen = current > 0 ? current - 1 : current;
  } else if (evt.keyCode === keyButtons.RIGHT || eventTarget === nextButton) {
    // check the screens limit
    newCurrentScreen = current < screens.length - 1 ? current + 1 : current;
  }

  if (current !== newCurrentScreen) {
    changeScreensState(newCurrentScreen);
  }
};

const changeScreensState = (newScreenId) => {
  screensState.current = newScreenId;

  renderScreen(screensState.current);
};

const wrap = (it) => {
  const shadow = document.createElement(`div`);
  const content = it.content.cloneNode(true);
  shadow.appendChild(content);
  return shadow.cloneNode(true);
};

const renderScreen = (id) => {
  if (main.children.length) {
    removeChildren(main);
  }

  if (id >= screens.length) {
    throw new Error(`Wrong screen number`);
  }

  const currentScreen = wrap(screens[id]);

  main.appendChild(currentScreen);
};
//  <--- end switchScreen section --->

// eventListeners
prevButton.addEventListener(`click`, switchScreens);
nextButton.addEventListener(`click`, switchScreens);
document.addEventListener(`keydown`, switchScreens);

renderScreen(screensState.current);
