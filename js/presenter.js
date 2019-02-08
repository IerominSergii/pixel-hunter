import {answersTypes} from "./configuration";
import {changeScreen, createElement, clearChildren} from "./util/util";
import GreetingView from "./pages/greeting-view";
import HeaderView from "./views/header-view";
import RulesView from "./pages/rules-view";

import getQuestionContainer from "./game/get-question-container";
import defineAnswer from "./game/define-answer";
import countPoints from "./game/count-points";

const ONE_SECOND = 1000;

export default class Presenter {
  constructor(model) {
    this.model = model;
    this.gameElement = createElement(``, `div`, `gameElement`);
    this.headerElement = createElement();
    this.gameSubContainer = createElement();

    this.gameElement.appendChild(this.gameSubContainer);

    this._timer = null;
    this.onGreetingContinueClick = () => {
      this.playGame();
    };
    this.rulesHandler = () => {
      this.rulesInputHandler();
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
    this.playGame();
  }

  updateHeader(time = false, lives = false) {
    clearChildren(this.headerElement);
    this.headerElement.appendChild(
        new HeaderView(this.resetGameHandler, time, lives).element
    );
  }

  tick() {
    this.model.time = this.model.time - 1;
  }

  startTimer() {
    const {time, lives} = this.model.state;

    if (time <= 0) {
      this.changeQuestion(false);
    }
    this.updateHeader(time, lives);
    this.timer = setTimeout(() => {
      this.tick();
      this.startTimer();
    }, ONE_SECOND);
  }

  endTimer() {
    const {time, lives} = this.model.state;

    clearTimeout(this.timer);
    this.model.resetTime();
    this.updateHeader(time, lives);
  }

  endGameCallback() {}

  endGame() {
    const {name, answers, lives, questions} = this.model.state;
    const results = countPoints(answers, lives, questions.length);

    this.endTimer();
    this.updateHeader();
    clearChildren(this.gameSubContainer);
    this.endGameCallback(name, answers, lives, results);
  }

  changeQuestion(isCurrentAnswerCorrect = false) {
    this.endTimer();
    const answerType = defineAnswer(isCurrentAnswerCorrect, this.model.time);
    this.model.answer = answerType;

    if (answerType === answersTypes.WRONG) {
      this.model.lives = this.model.lives - 1;
    }

    if (this.model.canContinue() && this.model.hasNextQuestion()) {
      this.model.currentQuestion = this.model.currentQuestion + 1;
      this.updateGameContent();
      this.startTimer();
    } else {
      this.model.deactivateGameState();
      this.endGame();
    }
  }

  updateGameContent() {
    const {
      questions,
      currentQuestion,
      time,
      lives,
      answers
    } = this.model.state;
    const {type, options} = questions[currentQuestion];

    this.updateHeader(time, lives);
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
    this.updateContent(this.model.state);
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
    const greeting = new GreetingView(this.onGreetingContinueClick);
    clearChildren(this.gameSubContainer);
    this.gameSubContainer.appendChild(greeting.element);
  }
}
