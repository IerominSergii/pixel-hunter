import {getInitialState, answersTypes} from "./configuration";
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
import getQuestionContainer from "./get-question-container";
import StatsView from "../pages/stats-view";
import countPoints from "./count-points";

const initialState = getInitialState();
let state;

const rulesInputHandler = () => {
  takePlayerName();
  updateGameContent(state);
  changeScreen(gameContainerElement);
};

const rules = new RulesView(rulesInputHandler);

const gameContainerElement = createElement(``, `div`, `gameContainerElement`);

const takePlayerName = () => {
  const name = document.querySelector(`.rules__input`);
  state = setUserName(state, name.value);
};

const updateGameContent = (gameState) => {
  const {answers, timer, lives} = gameState;
  const {type, options} = questions[gameState.currentQuestion];

  clearChildren(gameContainerElement);

  gameContainerElement.appendChild(
      new HeaderView(resetGameHandler, timer, lives).element
  );
  gameContainerElement.appendChild(
      getQuestionContainer(type, options, answers, questions, userEventHandler)
  );
};

const endGame = (gameState) => {
  const {name, answers, lives} = gameState;
  const results = countPoints(answers, lives, questions.length);

  clearChildren(gameContainerElement);
  gameContainerElement.appendChild(new HeaderView(resetGameHandler).element);
  const statsElement = new StatsView(name, answers, lives, results).element;
  gameContainerElement.appendChild(statsElement);
};

const changeQuestion = (isCurrentAnswerCorrect = false) => {
  const answerType = defineAnswer(isCurrentAnswerCorrect, state.timer);
  state = setAnswer(state, answerType);

  if (answerType === answersTypes.WRONG) {
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

const showGreeting = () => {
  const greeting = new GreetingView(playGame);
  changeScreen(greeting.element);
};

const resetGameHandler = () => {
  clearChildren(gameContainerElement);
  state = deactivateGameState(state);
  state = resetState(state);
  gameContainerElement.appendChild(new HeaderView(resetGameHandler).element);
  showGreeting();
};

const playGame = () => {
  state = activateGameState(state);

  gameContainerElement.appendChild(new HeaderView(resetGameHandler).element);
  gameContainerElement.appendChild(rules.element);
  changeScreen(gameContainerElement);
};

const initGame = () => {
  state = Object.assign({}, initialState);
  state = setQuestions(state, questions);
  showGreeting(state);
};

export default initGame;
