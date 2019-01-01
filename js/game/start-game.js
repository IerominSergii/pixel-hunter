import {getInitialState, ANSWERS_TYPES} from "./configuration";
import {changeScreen, createElement, clearChildren} from "../util/util";
import questionView from "../views/question";
import {questions} from "../data/data";
import headerTemplate from "./../views/header";
import hasNextQuestion from "./has-next-question";
import setCurrentQuestion from "./set-current-question";
import defineAnswer from "./define-answer";
import setAnswer from "./set-answer";
import setQuestions from "./set-questions";
import setLives from "./set-lives";
import canContinue from "./can-continue";
import statsScreen from "../pages/stats";
import greetingElement from "../pages/greeting";
import setUserName from "./set-user-name";
import resetState from "./reset-state";
import deactivateGameState from "./deactivate-game-state";
import activateGameState from "./activate-game-state";

const INITIAL_STATE = getInitialState();

const startGame = () => {
  let state = Object.assign({}, INITIAL_STATE);

  const resetGameHandler = () => {
    if (state.isGameActive) {
      const resultTitle = gameContainerElement.querySelector(`.result__title`);
      if (resultTitle) {
        gameContainerElement.replaceChild(questionElement, statsElement);
      }
    }

    state = deactivateGameState(state);
    state = resetState(state);
    updateHeader(state);
    changeScreen(greetingElement(playGame, headerElement));
  };

  const gameContainerElement = createElement();
  const headerElement = createElement();
  const questionElement = createElement();
  const statsElement = createElement();

  gameContainerElement.appendChild(headerElement);
  gameContainerElement.appendChild(questionElement);

  const showGreeting = () => {
    state = setQuestions(state, questions);

    updateHeader(state);
    const greeting = greetingElement(playGame, headerElement);
    changeScreen(greeting);
  };

  const updateHeader = (gameState) => {
    headerElement.innerHTML = headerTemplate(gameState);
    headerElement.addEventListener(`click`, resetGameHandler);
  };

  const updateGameContent = (gameState, handler) => {
    clearChildren(questionElement);
    questionElement.appendChild(questionView(gameState, handler));
  };

  const endGame = (gameState) => {
    updateHeader(gameState);
    statsElement.innerHTML = statsScreen(gameState);
    gameContainerElement.replaceChild(statsElement, questionElement);
  };

  const userEventHandler = (isAnswerCorrect) => {
    changeQuestion(isAnswerCorrect);
  };

  const changeQuestion = (isCurrentAnswerCorrect = false) => {
    const answerType = defineAnswer(isCurrentAnswerCorrect, state.timer);
    state = setAnswer(state, answerType);

    if (answerType === ANSWERS_TYPES.WRONG) {
      state = setLives(state, state.lives - 1);
    }

    if (canContinue(state) && hasNextQuestion(state)) {
      state = setCurrentQuestion(state, state.currentQuestion + 1);

      updateHeader(state);
      updateGameContent(state, userEventHandler);
    } else {
      state = deactivateGameState(state);
      endGame(state);
    }
  };

  const playGame = () => {
    state = activateGameState(state);

    const resultTitle = gameContainerElement.querySelector(`.result__title`);
    if (resultTitle) {
      gameContainerElement.replaceChild(questionElement, statsElement);
    }
    const name = document.querySelector(`.rules__input`);
    state = setUserName(state, name.value);
    gameContainerElement.prepend(headerElement);

    updateHeader(state);
    updateGameContent(state, userEventHandler);
    changeScreen(gameContainerElement);
  };

  showGreeting();
};

export default startGame;
