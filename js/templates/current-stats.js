const renderAnswerStats = (answer) => {
  return `<li class="stats__result stats__result--${answer}"></li>`;
};

export default (answers, questionsAmount) => {
  return `<ul class="stats">
  ${answers.map(renderAnswerStats).join(``)}
  ${new Array(questionsAmount - answers.length)
    .fill(`<li class="stats__result stats__result--unknown"></li>`)
    .join(``)}
</ul>`;
};
