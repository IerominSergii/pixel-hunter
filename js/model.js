import {
  getInitialState,
  bonusValue,
  DEFAULT_TIMER
} from "./game/configuration";

export default class Model {
  constructor(state = getInitialState()) {
    this._state = state;
  }

  get lives() {
    return this._state.lives;
  }

  set lives(value) {
    if (typeof value !== `number`) {
      throw new Error(`Wrong lives type, should be the number.`);
    }

    this._state = Object.freeze(
        Object.assign({}, this._state, {lives: value})
    );
  }

  get time() {
    return this._state.time;
  }

  set time(value) {
    if (typeof value !== `number`) {
      throw new Error(`Time type should be number`);
    }

    if (value < 0) {
      throw new Error(`Time shouldn't be negative`);
    }

    this._state = Object.freeze(
        Object.assign({}, this._state, {time: value})
    );
  }

  get name() {
    return this._state.name;
  }

  set name(userName) {
    if (typeof userName !== `string`) {
      throw new Error(`userName should be string type`);
    }

    this._state = Object.freeze(
        Object.assign({}, this._state, {name: userName})
    );
  }

  get answers() {
    return this._state.answers;
  }

  set answer(newAnswer) {
    if (typeof newAnswer !== `string`) {
      throw new Error(`Wrong newAnswer type, should be string.`);
    }

    if (isNaN(bonusValue[newAnswer.toUpperCase()])) {
      throw new Error(`Unknown answer type, check the 'bonuses' object.`);
    }

    const newAnswers = this._state.answers.slice();
    newAnswers.push(newAnswer);

    const newState = Object.assign({}, this._state, {
      answers: newAnswers
    });

    this._state = Object.freeze(newState);
  }

  get currentQuestion() {
    return this._state.currentQuestion;
  }

  set currentQuestion(currentQuestion) {
    if (typeof currentQuestion !== `number`) {
      throw new Error(`currentQuestion type should be number`);
    }

    if (currentQuestion < 0) {
      throw new Error(`currentQuestion should not be negative`);
    }

    this._state = Object.freeze(
        Object.assign({}, this._state, {currentQuestion})
    );
  }

  tick() {
    this._state = this.setTimerTime(this._state, this._state.time - 1);
  }

  resetTimer() {
    this._state = Object.freeze(
        Object.assign({}, this._state, {time: DEFAULT_TIMER})
    );
  }

  activateGameState() {
    this._state = Object.freeze(
        Object.assign({}, this._state, {isGameActive: true})
    );
  }

  canContinue() {
    return this._state.lives >= 0;
  }

  deactivateGameState() {
    this._state = Object.freeze(
        Object.assign({}, this._state, {isGameActive: false})
    );
  }

  hasNextQuestion() {
    return this._state.questions.length > this._state.currentQuestion + 1;
  }

  setQuestions(questions) {
    const newQuestions = Object.freeze(questions.slice());
    this._state = Object.assign({}, this._state, {questions: newQuestions});
  }

  resetState() {
    const {questions} = this._state;
    const initialState = getInitialState();
    const newQuestions = Object.freeze(questions);

    this._state = Object.freeze(
        Object.assign({}, initialState, {questions: newQuestions})
    );
  }
}
