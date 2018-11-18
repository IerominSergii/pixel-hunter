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
const buttonsStyle = `<style>
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
  </style>`;

const createButton = (innerHtml, handler) => {
  const button = document.createElement(`button`);
  button.className = `arrows__btn`;
  button.innerHTML = innerHtml;
  button.addEventListener(`click`, handler);

  return button;
};

const arrowButtons = document.createElement(`div`);
arrowButtons.className = `arrows__wrap`;
arrowButtons.insertAdjacentHTML(`afterBegin`, buttonsStyle);
//  <--- end arrows buttons section --->

// <--- start switchScreen section --->
const wrap = (it) => {
  const shadow = document.createElement(`div`);
  const content = it.content.cloneNode(true);
  shadow.appendChild(content);
  return shadow.cloneNode(true);
};

const clearChildren = (parentElement) => {
  while (parentElement.lastChild) {
    parentElement.removeChild(parentElement.lastChild);
  }
};

const renderScreen = (id) => {
  clearChildren(main);

  main.appendChild(wrap(screenTemplates[id]));
};

const shouldGoPrev = () => {
  return currentScreenIndex > 0;
};

const shouldGoNext = () => {
  return currentScreenIndex < screenTemplates.length - 1;
};

const goPrev = () => {
  if (shouldGoPrev()) {
    currentScreenIndex -= 1;
    renderScreen(currentScreenIndex);
  }
};

const goNext = () => {
  if (shouldGoNext()) {
    currentScreenIndex += 1;
    renderScreen(currentScreenIndex);
  }
};

// eventListeners
const arrowButtonKeyDownHandler = (evt) => {
  if (evt.keyCode === keyCodes.LEFT_ARROW) {
    goPrev();
  } else if (evt.keyCode === keyCodes.RIGHT_ARROW) {
    goNext();
  }
};

const prevButtonClickHandler = () => {
  goPrev();
};

const nextButtonClickHandler = () => {
  goNext();
};
//  <--- end switchScreen section --->

document.addEventListener(`keydown`, arrowButtonKeyDownHandler);

const prevButton = createButton(`<-`, prevButtonClickHandler);
const nextButton = createButton(`->`, nextButtonClickHandler);
arrowButtons.appendChild(prevButton);
arrowButtons.appendChild(nextButton);
body.appendChild(arrowButtons);

renderScreen(currentScreenIndex);
