import isLose from "./is-lose";
import getBonuses from "./get-bonuses";
import {bonusValue, answersTypes} from "./configuration";

const getTotalResults = (answers, lives) => {
  const bonus = getBonuses(answers, lives);

  const total = {};
  total.amount = bonus.correct.amount + bonus.fast.amount + bonus.slow.amount;
  total.value = total.amount * bonusValue[answersTypes.CORRECT.toUpperCase()];

  const final = {};
  final.value =
    total.value + bonus.fast.value - bonus.slow.value + bonus.life.value;

  return Object.assign({}, bonus, {total, final});
};

export default (answers, lives, questionsAmount) => {
  if (isLose(lives) || answers.length < questionsAmount) {
    return {final: {value: -1}};
  } else {
    return getTotalResults(answers, lives);
  }
};
