import {getInitialState} from "./configuration";
import resetState from "./game/reset-state";
import setQuestions from "./game/set-questions";
import hasNextQuestion from "./game/has-next-question";
import deactivateGameState from "./game/deactivate-game-state";
import canContinue from "./game/can-continue";
import activateGameState from "./game/activate-game-state";
import resetTime from "./game/reset-time";
import tick from "./game/tick";
import setCurrentQuestion from "./game/set-current-question";
import setAnswer from "./game/set-answer";
import setName from "./game/set-name";
import setTime from "./game/set-time";
import setLives from "./game/set-lives";

export default class Model {
  constructor(state = getInitialState()) {
    this._state = state;
  }

  get state() {
    return this._state;
  }

  get lives() {
    return this._state.lives;
  }

  set lives(value) {
    this._state = setLives(this._state, value);
  }

  get time() {
    return this._state.time;
  }

  set time(value) {
    this._state = setTime(this._state, value);
  }

  get name() {
    return this._state.name;
  }

  set name(userName) {
    this._state = setName(this._state, userName);
  }

  get answers() {
    return this._state.answers;
  }

  set answer(newAnswer) {
    this._state = setAnswer(this._state, newAnswer);
  }

  get currentQuestion() {
    return this._state.currentQuestion;
  }

  set currentQuestion(currentQuestion) {
    this._state = setCurrentQuestion(this._state, currentQuestion);
  }

  set questions(questions) {
    this._state = setQuestions(this._state, questions);
  }

  tick() {
    this._state = tick(this._state);
  }

  resetTime() {
    this._state = resetTime(this._state);
  }

  activateGameState() {
    this._state = activateGameState();
  }

  canContinue() {
    return canContinue(this._state);
  }

  deactivateGameState() {
    this._state = deactivateGameState(this._state);
  }

  hasNextQuestion() {
    return hasNextQuestion(this._state);
  }

  resetState() {
    this._state = resetState(this._state);
  }
}
