const renderOption = (option, index) => {
  return `<div class="game__option">
  <img
    src="${option.src}"
    alt="Option ${index + 1}"
    data-answer="${option.thisIs}"
    width="304"
    height="455"
  />
</div>`;
};

export default (question) => {
  return `<p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
  ${question.options.map(renderOption).join(``)}  
</form>`;
};
