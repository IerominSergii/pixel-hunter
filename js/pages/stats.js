import countPoints from "../game/count-points";
import {
  ANSWERS_TYPES,
  ANSWER_POINTS,
  SAVED_LIFE_VALUE,
  FAST_BONUS,
  SLOW_BONUS
} from "../game/configuration";

const getTotalResults = (answers) => {
  const correctAnswers = answers.filter((answer) => {
    return answer !== ANSWERS_TYPES.WRONG && answer !== ANSWERS_TYPES.UNKNOWN;
  });

  return correctAnswers.length * ANSWER_POINTS.correct;
};

const getFastBonus = (fastAnswersAmount) => {
  return fastAnswersAmount * FAST_BONUS;
};

const getSlowBonus = (slowAnswersAmount) => {
  return slowAnswersAmount * SLOW_BONUS;
};

const getLivesBonus = (lives) => {
  return lives * SAVED_LIFE_VALUE;
};

export default (state) => {
  const {name, answers, lives, questions} = state;
  const totalResultFinal = countPoints(answers, lives, questions.length);
  const fastAnswers = answers.filter((answer) => {
    return answer === ANSWERS_TYPES.FAST;
  });
  const slowAnswers = answers.filter((answer) => {
    return answer === ANSWERS_TYPES.SLOW;
  });

  const getTitleTemplate = (finalResult) => {
    return `<h2 class="result__title">${
      finalResult === -1 ? `Проиграл.` : `Победа!`
    }</h2>`;
  };

  const getAnswersTemplate = () => {
    return `<ul class="stats">
    ${answers
      .map((answer) => {
        return `<li class="stats__result stats__result--${
          ANSWERS_TYPES[answer.toUpperCase()]
        }"></li>`;
      })
      .join(``)}
  </ul>`;
  };

  const getDetailsTemplate = () => {
    const detailsTemplate = `<tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">
        1 <span class="stats__result stats__result--fast"></span>
      </td>
      <td class="result__points">${fastAnswers.length} × 50</td>
      <td class="result__total">${getFastBonus(fastAnswers.length)}</td>
      </tr>
      <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">
        2 <span class="stats__result stats__result--alive"></span>
      </td>
      <td class="result__points">${lives} × 50</td>
      <td class="result__total">${getLivesBonus(lives)}</td>
      </tr>
      <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">
        2 <span class="stats__result stats__result--slow"></span>
      </td>
      <td class="result__points">${slowAnswers.length} × 50</td>
      <td class="result__total">-${getSlowBonus(slowAnswers.length)}</td>
    </tr>`;

    if (totalResultFinal !== -1) {
      return detailsTemplate;
    } else {
      return ``;
    }
  };

  const getPlayerTemplate = () => {
    return `<table class="result__table">
    <tr>
      <td class="result__number">1. ${name}</td>
      <td colspan="2">
      ${getAnswersTemplate(answers)}
      </td>
      <td class="result__points">${answers.length} × 100</td>
      <td class="result__total">${getTotalResults(answers)}</td>
    </tr>
    ${getDetailsTemplate()}
    <tr>
      <td colspan="5" class="result__total  result__total--final">${totalResultFinal}</td>
    </tr>
  </table>`;
  };

  return `<section class="result">
    ${getTitleTemplate(totalResultFinal)}
    ${getPlayerTemplate()}
  </section>`;
};
