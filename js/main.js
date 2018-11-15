"use strict";

// constant
const keyCodes = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
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

// variables
const screenTemplates = [intro, greeting, rules, game1, game2, game3, stats];
let currentScreenIndex = 2;

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

  main.appendChild(wrap(screenTemplates[id]));
};

const removeChildren = (parentElement) => {
  while (parentElement.lastChild) {
    parentElement.removeChild(parentElement.lastChild);
  }
};

const defineUserAction = (evt) => {
  let action = `notDefined`;

  if (evt.keyCode === keyCodes.LEFT_ARROW || evt.target === prevButton) {
    action = `moveToPrevScreen`;
  } else if (
    evt.keyCode === keyCodes.RIGHT_ARROW ||
    evt.target === nextButton
  ) {
    action = `moveToNextScreen`;
  }

  return action;
};

const getNewCurrentScreenIndex = (action) => {
  let newScreenIndex = currentScreenIndex;

  if (action === `moveToPrevScreen`) {
    return currentScreenIndex > 0 ? currentScreenIndex - 1 : currentScreenIndex;
  } else if (action === `moveToNextScreen`) {
    return currentScreenIndex < screenTemplates.length - 1
      ? currentScreenIndex + 1
      : currentScreenIndex;
  }

  return newScreenIndex;
};

const switchOverScreen = (evt) => {
  const action = defineUserAction(evt);
  currentScreenIndex = getNewCurrentScreenIndex(action);
  renderScreen(currentScreenIndex);
};

// eventHandlers
const buttonClickHandler = (evt) => {
  switchOverScreen(evt);
};

const arrowButtonPressDownHandler = (evt) => {
  switchOverScreen(evt);
};
//  <--- end switchScreen section --->

// eventListeners
prevButton.addEventListener(`click`, buttonClickHandler);
nextButton.addEventListener(`click`, buttonClickHandler);
document.addEventListener(`keydown`, arrowButtonPressDownHandler);

renderScreen(currentScreenIndex);
