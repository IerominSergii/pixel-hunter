import {getInitialState, ANSWERS_TYPES} from "./configuration";
import {changeScreen, createElement, clearChildren} from "../util/util";
import {questions} from "../data/data";
import hasNextQuestion from "./has-next-question";
import setCurrentQuestion from "./set-current-question";
import defineAnswer from "./define-answer";
import setAnswer from "./set-answer";
import setQuestions from "./set-questions";
import setLives from "./set-lives";
import canContinue from "./can-continue";
import setUserName from "./set-user-name";
import resetState from "./reset-state";
import deactivateGameState from "./deactivate-game-state";
import activateGameState from "./activate-game-state";
import HeaderView from "../views/header-view";
import GreetingView from "../pages/greeting-view";
import RulesView from "../pages/rules-view";
import Question from "../views/question-view";
import StatsView from "../pages/stats-view";

const initialState = getInitialState();
let state;
const rules = new RulesView();

const gameContainerElement = createElement(``, `div`, `gameContainerElement`);

const takePlayerName = () => {
  const name = document.querySelector(`.rules__input`);
  state = setUserName(state, name.value);
};

const updateGameContent = (gameState) => {
  clearChildren(gameContainerElement);
  updateHeader(gameState);
  updateQuestion(gameState);
};

const endGame = (gameState) => {
  clearChildren(gameContainerElement);
  updateHeader(gameState);
  const statsElement = new StatsView(gameState);
  gameContainerElement.appendChild(statsElement.element);
};

const changeQuestion = (isCurrentAnswerCorrect = false) => {
  const answerType = defineAnswer(isCurrentAnswerCorrect, state.timer);
  state = setAnswer(state, answerType);

  if (answerType === ANSWERS_TYPES.WRONG) {
    state = setLives(state, state.lives - 1);
  }

  if (canContinue(state) && hasNextQuestion(state)) {
    state = setCurrentQuestion(state, state.currentQuestion + 1);

    updateGameContent(state);
  } else {
    state = deactivateGameState(state);
    endGame(state);
  }
};

const userEventHandler = (isAnswerCorrect) => {
  changeQuestion(isAnswerCorrect);
};

const rulesInputHandler = () => {
  takePlayerName();
  updateGameContent(state);
  changeScreen(gameContainerElement);
};

const showGreeting = () => {
  const greeting = new GreetingView();
  greeting.continueClickHandler = playGame;
  changeScreen(greeting.element);
};

const resetGameHandler = () => {
  clearChildren(gameContainerElement);
  state = deactivateGameState(state);
  state = resetState(state);

  updateHeader(state);
  showGreeting();
};

const updateHeader = (gameState) => {
  const newHeader = new HeaderView(gameState);
  newHeader.onBackButtonClick = resetGameHandler;
  gameContainerElement.prepend(newHeader.element);
};

const updateQuestion = (gameState) => {
  const newQuestion = new Question(gameState);
  newQuestion.userChoiceHandler = userEventHandler;

  gameContainerElement.appendChild(newQuestion.element);
};

const playGame = () => {
  updateHeader(state);
  state = activateGameState(state);
  rules.submitFormCallback = rulesInputHandler;

  gameContainerElement.appendChild(rules.element);
  changeScreen(gameContainerElement);
};

const initGame = () => {
  state = Object.assign({}, initialState);
  state = setQuestions(state, questions);

  showGreeting(state);
};

export default initGame;
