const main = document.querySelector(`.central`);

export const clearChildren = (parentElement) => {
  while (parentElement.lastChild) {
    parentElement.removeChild(parentElement.lastChild);
  }
};

// template must not be multiply
export const createElement = (template) => {
  const newElement = document.createElement(`div`);

  newElement.innerHTML = template;
  return newElement;
};

export const changeScreen = (newScreen) => {
  clearChildren(main);
  main.appendChild(newScreen);
};
