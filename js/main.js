"use strict";

// constant
const keyCodes = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
};
const START_SCREEN = 2;
const userActions = {
  pressedLeftArrow: `moveToLeftScreen`,
  pressedRightArrow: `moveToRightScreen`,
  clickedPrevButton: `moveToLeftScreen`,
  clickedNextButton: `moveToRightScreen`,
  notDefined: `notDefined`
};

// domElements
const body = document.body;
const main = body.querySelector(`#main`);

// screen templates
const intro = body.querySelector(`#intro`);
const greeting = body.querySelector(`#greeting`);
const rules = body.querySelector(`#rules`);
const game1 = body.querySelector(`#game-1`);
const game2 = body.querySelector(`#game-2`);
const game3 = body.querySelector(`#game-3`);
const stats = body.querySelector(`#stats`);

const screenTemplates = [intro, greeting, rules, game1, game2, game3, stats];

// state
const screensState = {
  current: START_SCREEN,
  changeScreensState(newScreenId) {
    screensState.current = newScreenId;
    renderScreen(screensState.current);
  }
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

const defineUserAction = (evt) => {
  let action = userActions.notDefined;

  if (evt.keyCode === keyCodes.LEFT_ARROW) {
    action = userActions.pressedLeftArrow;
  }

  if (evt.keyCode === keyCodes.RIGHT_ARROW) {
    action = userActions.pressedRightArrow;
  }

  if (evt.target === prevButton) {
    action = userActions.clickedPrevButton;
  }

  if (evt.target === nextButton) {
    action = userActions.clickedNextButton;
  }

  if (action !== userActions.notDefined) {
    provideChangesToState(action);
  }
};

const provideChangesToState = (action) => {
  const {current} = screensState;
  let newCurrentScreen = current;

  switch (action) {
    case `moveToLeftScreen`:
      // check the screens limit
      newCurrentScreen = current > 0 ? current - 1 : current;
      break;
    case `moveToRightScreen`:
      // check the screens limit
      newCurrentScreen =
        current < screenTemplates.length - 1 ? current + 1 : current;
      break;
    default:
      throw new Error(`Unknown user action`);
  }

  if (current !== newCurrentScreen) {
    screensState.changeScreensState(newCurrentScreen);
  }
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

  if (id >= screenTemplates.length || id < 0) {
    throw new Error(`Wrong screen number`);
  }

  const currentScreen = wrap(screenTemplates[id]);

  main.appendChild(currentScreen);
};
//  <--- end switchScreen section --->

// eventListeners
prevButton.addEventListener(`click`, defineUserAction);
nextButton.addEventListener(`click`, defineUserAction);
document.addEventListener(`keydown`, defineUserAction);

renderScreen(screensState.current);
