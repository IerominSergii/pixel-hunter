import {bonuses, answersTypes} from "./configuration";

const getBonus = (amount, bonusType = `life`) => {
  let answersAmount = amount;

  if (Array.isArray(amount)) {
    answersAmount = amount.filter((answer) => {
      return answer === bonusType;
    }).length;
  }

  const bonus = answersAmount * bonuses[bonusType.toUpperCase()];
  return {value: bonus, amount: answersAmount};
};

export default (answers, lives) => {
  return {
    correct: getBonus(answers, answersTypes.CORRECT),
    fast: getBonus(answers, answersTypes.FAST),
    slow: getBonus(answers, answersTypes.SLOW),
    life: getBonus(lives)
  };
};
