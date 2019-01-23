import isLose from "./is-lose";
import getBonuses from "./get-bonuses";

const getTotalResult = (answers, lives) => {
  const bonusResult = getBonuses(answers, lives);

  return (
    bonusResult.correct.value +
    bonusResult.fast.value -
    bonusResult.slow.value +
    bonusResult.life.value
  );
};

export default (answers, lives, questionsAmount) => {
  if (isLose(lives) || answers.length < questionsAmount) {
    return -1;
  } else {
    return getTotalResult(answers, lives);
  }
};
