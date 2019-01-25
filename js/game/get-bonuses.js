import {bonuses, answersTypes} from "./configuration";

const getPointBonus = (amount, bonusType) => {
  const answersAmount = amount.filter((answer) => {
    return answer === bonusType;
  }).length;

  const bonus = answersAmount * bonuses[bonusType.toUpperCase()];
  return {value: bonus, amount: answersAmount};
};

const getLifeBonus = (amount) => {
  const bonus = amount * bonuses.LIFE;
  return {value: bonus, amount};
};

export default (answers, lives) => {
  return {
    correct: getPointBonus(answers, answersTypes.CORRECT),
    fast: getPointBonus(answers, answersTypes.FAST),
    slow: getPointBonus(answers, answersTypes.SLOW),
    life: getLifeBonus(lives)
  };
};
