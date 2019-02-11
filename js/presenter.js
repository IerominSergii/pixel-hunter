import {answersTypes} from "./configuration";
import {changeScreen, createElement, clearChildren} from "./util/util";
import GreetingView from "./pages/greeting-view";
import HeaderView from "./views/header-view";
import RulesView from "./pages/rules-view";

import getQuestionContainer from "./game/get-question-container";
import defineAnswer from "./game/define-answer";
import countPoints from "./game/count-points";
import Application from "./application";

const ONE_SECOND = 1000;
let _timer;

export default class Presenter {
  constructor(model) {
    this.model = model;
    this.gameElement = createElement(``, `div`, `gameElement`);
    this.headerElement = createElement();
    this.gameSubContainer = createElement();

    this.gameElement.appendChild(this.gameSubContainer);

    // _timer = null;
    this.playGameHandler = () => {
      this.playGame();
    };
    this.rulesHandler = (evt) => {
      this.rulesInputHandler(evt);
    };
    this.userEventHandler = (isAnswerCorrect) => {
      this.changeQuestion(isAnswerCorrect);
    };
    this.resetGameHandler = () => {
      this.resetGame();
    };
    this.updateContent = () => {
      this.updateGameContent();
    };
  }

  get element() {
    return this.gameElement;
  }

  renderToSubContainer(element) {
    clearChildren(this.gameSubContainer);
    this.gameSubContainer.appendChild(element);
  }

  resetGame() {
    this.endTimer();
    this.model.deactivateGameState();
    this.model.resetState();

    clearChildren(this.gameSubContainer);
    this.initGame();
  }

  updateHeader(time = false, lives = false) {
    clearChildren(this.headerElement);
    this.headerElement.appendChild(
        new HeaderView(this.resetGameHandler, time, lives).element
    );
  }

  startTimer() {
    const time = this.model.time;
    const lives = this.model.lives;

    if (time <= 0) {
      clearTimeout(_timer);
      // !!!!!!!!!!!!!!!!!!!!!!!!!!
      // this.endTimer();
      this.userEventHandler(false);
      // this.model.resetTime();
    }

    clearTimeout(_timer);
    _timer = setTimeout(() => {
      this.updateHeader(time, lives);
      this.model.tick();
      this.startTimer();
    }, ONE_SECOND);
  }

  endTimer() {
    // const time = this.model.time;
    // const lives = this.model.lives;

    clearTimeout(_timer);
    // this.updateHeader(time, lives);
    this.model.resetTime();
  }

  endGame() {
    clearTimeout(_timer);
    const name = this.model.name;
    const answers = this.model.answers;
    const lives = this.model.lives;
    const questions = this.model.questions;
    const results = countPoints(answers, lives, questions.length);

    // this.endTimer();
    this.updateHeader();
    clearChildren(this.gameSubContainer);

    Application.showStats(name, answers, lives, results, this.gameSubContainer);
  }

  changeQuestion(isCurrentAnswerCorrect = false) {
    this.endTimer();
    const time = this.model.time;
    const lives = this.model.lives;
    const answerType = defineAnswer(isCurrentAnswerCorrect, time);
    this.model.answer = answerType;

    if (answerType === answersTypes.WRONG) {
      this.model.lives = lives - 1;
    }

    if (this.model.canContinue() && this.model.hasNextQuestion()) {
      this.model.currentQuestion = this.model.currentQuestion + 1;

      this.model.resetTime();
      this.updateHeader(time, lives);
      this.updateGameContent();

      this.startTimer();
    } else {
      this.model.deactivateGameState();
      clearTimeout(_timer);
      this.endGame();
    }
  }

  updateGameContent() {
    // const time = this.model.time;
    // const lives = this.model.lives;
    const answers = this.model.answers;
    const questions = this.model.questions;
    const currentQuestion = this.model.currentQuestion;
    const {type, options} = questions[currentQuestion];

    // this.updateHeader(time, lives);
    clearChildren(this.gameSubContainer);
    this.gameSubContainer.appendChild(
        getQuestionContainer(
            type,
            options,
            answers,
            questions,
            this.userEventHandler
        )
    );
  }

  rulesInputHandler() {
    const userName = document.querySelector(`.rules__input`).value;

    this.model.name = userName;

    this.updateGameContent();
    changeScreen(this.gameElement);
    this.startTimer();
  }

  playGame() {
    this.gameElement.prepend(this.headerElement);
    this.updateHeader();

    this.model.activateGameState();

    clearChildren(this.gameSubContainer);
    this.gameSubContainer.appendChild(new RulesView(this.rulesHandler).element);
  }

  initGame() {
    clearChildren(this.headerElement);
    clearChildren(this.gameSubContainer);
    const greeting = new GreetingView(this.playGameHandler);
    this.gameSubContainer.appendChild(greeting.element);
  }
}
