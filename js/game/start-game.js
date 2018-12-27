import {getInitialState, ANSWERS_TYPES, questionsType} from "./configuration";
import {changeScreen, createElement} from "../util/util";
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
import isAnswerCorrect from "./is-answer-correct";
import greetingElement from "../pages/greeting";
import setUserName from "./set-user-name";
import resetState from "./reset-state";
import setTimerTime from "./set-timer-time";
import resetTimerTime from "./reset-timer-time";
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

  const defineHandler = (type, element, callback, timerId) => {
    const handler = (evt) => {
      clearInterval(timerId);
      callback(evt);
    };

    const gameOption = element.querySelector(`.game__content`);
    if (type === questionsType.TRIPLE) {
      gameOption.addEventListener(`click`, handler);
    } else {
      gameOption.addEventListener(`change`, handler);
    }
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

  const updateGameContent = (gameState) => {
    questionElement.innerHTML = questionView(gameState);
  };

  const endGame = (gameState) => {
    updateHeader(gameState);
    statsElement.innerHTML = statsScreen(gameState);
    gameContainerElement.replaceChild(statsElement, questionElement);
  };

  const changeQuestion = (isCurrentAnswerCorrect = false) => {
    state = resetTimerTime(state);
    const timer = startTimer();
    const answerType = defineAnswer(isCurrentAnswerCorrect, state.timer);
    state = setAnswer(state, answerType);

    if (answerType === ANSWERS_TYPES.WRONG) {
      state = setLives(state, state.lives - 1);
    }

    if (canContinue(state) && hasNextQuestion(state)) {
      state = setCurrentQuestion(state, state.currentQuestion + 1);

      updateHeader(state);
      updateGameContent(state);
      const questionType = state.questions[state.currentQuestion].type;
      defineHandler(questionType, questionElement, userEventHandler, timer);
    } else {
      clearInterval(timer);
      state = deactivateGameState(state);
      endGame(state);
    }
  };

  const startTimer = () => {
    const timerId = setInterval(() => {
      if (state.timer > 0) {
        state = setTimerTime(state, state.timer - 1);
        updateHeader(state);
      } else {
        clearInterval(timerId);
        changeQuestion();
      }
    }, 1000);

    return timerId;
  };

  const userEventHandler = (evt) => {
    const isCurrentAnswerCorrect = isAnswerCorrect(state.currentQuestion, evt);

    if (isCurrentAnswerCorrect !== `answerWasNotTaken`) {
      state = resetTimerTime(state);
      changeQuestion(isCurrentAnswerCorrect);
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
    updateGameContent(state);

    const questionType = state.questions[state.currentQuestion].type;
    const timerId = startTimer();
    defineHandler(questionType, questionElement, userEventHandler, timerId);

    changeScreen(gameContainerElement);
  };

  showGreeting();
};

export default startGame;
