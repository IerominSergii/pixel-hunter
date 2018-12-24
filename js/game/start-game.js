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
import canContinue from "./canContinue";
import statsScreen from "../pages/stats";
import isAnswerCorrect from "./is-answer-correct";
import getFinish from "./get-finish";
import greetingElement from "../pages/greeting";
import setUserName from "./set-user-name";
import resetState from "./reset-state";

const INITIAL_STATE = getInitialState();

const startGame = () => {
  let state = Object.assign({}, INITIAL_STATE);

  const resetGameHandler = () => {
    state = resetState(state);
    updateHeader(state);
    changeScreen(greetingElement(playGame, headerElement));
  };

  const defineHandler = (type, element, handler) => {
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

  const userEventHandler = (evt) => {
    const isCurrentAnswerCorrect = isAnswerCorrect(state.currentQuestion, evt);

    if (isCurrentAnswerCorrect !== `answerWasNotTaken`) {
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
        defineHandler(questionType, questionElement, userEventHandler);
      } else {
        state = getFinish(state);
        endGame(state);
      }
    }
  };

  const playGame = () => {
    const name = document.querySelector(`.rules__input`);
    state = setUserName(state, name.value);
    gameContainerElement.prepend(headerElement);

    updateHeader(state);
    updateGameContent(state);

    const questionType = state.questions[state.currentQuestion].type;
    defineHandler(questionType, questionElement, userEventHandler);

    changeScreen(gameContainerElement);
  };

  showGreeting();
};

export default startGame;
