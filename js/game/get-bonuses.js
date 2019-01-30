import {bonusValue, answersTypes} from "./configuration";

const getPointBonus = (answers) => {
  const bonuses = {
    [answersTypes.CORRECT]: {value: 0, amount: 0},
    [answersTypes.FAST]: {value: 0, amount: 0},
    [answersTypes.SLOW]: {value: 0, amount: 0},
    [answersTypes.WRONG]: {value: 0, amount: 0},
    [answersTypes.UNKNOWN]: {value: 0, amount: 0}
  };

  answers.forEach((answer) => {
    bonuses[answersTypes[answer.toUpperCase()]].amount += 1;
  });

  for (const type in bonuses) {
    if (bonuses.hasOwnProperty(type)) {
      bonuses[type].value =
        bonuses[type].amount * bonusValue[type.toUpperCase()];
    }
  }

  return bonuses;
};

const getLifeBonus = (amount) => {
  const bonus = amount * bonusValue.LIFE;
  return {life: {value: bonus}};
};

export default (answers, lives) => {
  return Object.assign({}, getPointBonus(answers), getLifeBonus(lives));
};
