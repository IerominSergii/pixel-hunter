import {LEVEL_AMOUNT} from "./configuration";

const isLose = (answersAmount) => {
  return answersAmount < LEVEL_AMOUNT ? true : false;
};

export default isLose;
