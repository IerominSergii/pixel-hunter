const main = document.querySelector(`.central`);

export const clearChildren = (parentElement) => {
  while (parentElement.lastChild) {
    parentElement.removeChild(parentElement.lastChild);
  }
};

export const createElement = (template = ``, tag = `div`, className = ``) => {
  const newElement = document.createElement(tag);

  if (className) {
    newElement.classList.add(className);
  }

  newElement.innerHTML = template;
  return newElement;
};

export const changeScreen = (newScreen) => {
  clearChildren(main);
  main.appendChild(newScreen);
};
