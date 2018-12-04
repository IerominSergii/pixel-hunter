import {MAX_TIMER_VALUE} from "./configuration";

const createTimer = (time) => {
  if (time <= 0 || time > MAX_TIMER_VALUE) {
    throw new Error(
        `Time shouldn't be negative, equal 0 or more than MAX_TIMER_VALUE`
    );
  }

  if (typeof time !== `number`) {
    throw new Error(`time type should be number`);
  }

  const gameTimer = {
    time,
    isOver: false,
    tick() {
      if (this.time > 0) {
        this.time = this.time -= 1;
      }

      if (this.time <= 0) {
        this.isOver = true;
      }
    }
  };

  return gameTimer;
};

export default createTimer;
