import {answersTypes} from "./configuration";
import {changeScreen, createElement, clearChildren} from "./util/util";
import HeaderView from "./views/header-view";

import getQuestionContainer from "./game/get-question-container";
import defineAnswer from "./game/define-answer";
import countPoints from "./game/count-points";
import Application from "./application";

// const ONE_SECOND = 1000;
export default class Presenter {
  constructor(model) {
    this.model = model;
    this.gameElement = createElement(``, `div`, `gameElement`);

    // this._timer = null;
    this.resetGame = this.resetGame.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
  }

  get element() {
    return this.gameElement;
  }

  resetGame() {
    // this.endTimer();
    this.model.deactivateGameState();
    this.model.resetState();

    clearChildren(this.gameElement);
    // this.playGame();
    Application.showGreeting();
  }

  updateHeader(time = false, lives = false) {
    this.header = new HeaderView(this.resetGame, time, lives).element;
  }

  // startTimer() {
  //   const time = this.model.time;
  //   const lives = this.model.lives;

  //   if (time <= 0) {
  //     clearTimeout(this._timer);
  //     this.endTimer();
  //     this.changeQuestion(false);
  //     this.model.resetTime();
  //   }

  //   clearTimeout(this._timer);
  //   this._timer = setTimeout(() => {
  //     this.updateHeader(time, lives);
  //     this.model.tick();
  //     this.startTimer();
  //   }, ONE_SECOND);
  // }

  // endTimer() {
  //   const time = this.model.time;
  //   const lives = this.model.lives;
  //   clearTimeout(this._timer);
  //   this.updateHeader(time, lives);
  //   this.model.resetTime();
  // }

  endGame() {
    // clearTimeout(this._timer);
    const name = this.model.name;
    const answers = this.model.answers;
    const lives = this.model.lives;
    const questions = this.model.questions;
    const results = countPoints(answers, lives, questions.length);

    Application.showStats(name, answers, lives, results);
  }

  changeQuestion(isCurrentAnswerCorrect = false) {
    // this.endTimer();
    const time = this.model.time;
    const lives = this.model.lives;
    const answerType = defineAnswer(isCurrentAnswerCorrect, time);
    this.model.answer = answerType;

    if (answerType === answersTypes.WRONG) {
      this.model.lives = lives - 1;
    }

    if (this.model.canContinue() && this.model.hasNextQuestion()) {
      this.model.currentQuestion = this.model.currentQuestion + 1;

      // this.model.resetTime();
      this.updateHeader(time, lives);
      this.updateGameContent();

      // this.startTimer();
    } else {
      this.model.deactivateGameState();
      // clearTimeout(this._timer);
      this.endGame();
    }
  }

  updateGameContent() {
    const time = this.model.time;
    const lives = this.model.lives;
    const answers = this.model.answers;
    const questions = this.model.questions;
    const currentQuestion = this.model.currentQuestion;
    const {type, options} = questions[currentQuestion];

    clearChildren(this.gameElement);
    this.gameElement.appendChild(
        new HeaderView(this.resetGame, time, lives).element
    );
    this.gameElement.appendChild(
        getQuestionContainer(
            type,
            options,
            answers,
            questions,
            this.changeQuestion
        )
    );
  }

  playGame() {
    this.model.activateGameState();
    this.updateGameContent();
    changeScreen(this.gameElement);
    // this.startTimer();
  }
}
