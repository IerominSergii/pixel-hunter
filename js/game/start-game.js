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

const INITIAL_STATE = getInitialState();

const startGame = () => {
  let state = Object.assign({}, INITIAL_STATE);
  state = setQuestions(state, questions);

  const gameContainerElement = createElement();
  const headerElement = createElement();
  const questionElement = createElement();
  const statsElement = createElement();

  gameContainerElement.appendChild(headerElement);
  gameContainerElement.appendChild(questionElement);

  const updateGame = (gameState) => {
    headerElement.innerHTML = headerTemplate(gameState);
    questionElement.innerHTML = questionView(gameState);
  };

  const endGame = (gameState) => {
    headerElement.innerHTML = headerTemplate(gameState);
    statsElement.innerHTML = statsScreen(gameState);
    changeScreen(statsElement);
  };

  const defineHandler = (type, element, handler) => {
    const gameOption = element.querySelector(`.game__content`);
    if (type === questionsType.TRIPLE) {
      gameOption.addEventListener(`click`, handler);
    } else {
      gameOption.addEventListener(`change`, handler);
    }
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

        updateGame(state);
        const questionType = state.questions[state.currentQuestion].type;
        defineHandler(questionType, questionElement, userEventHandler);
      } else {
        state = getFinish(state);
        endGame(state);
      }
    }
  };

  updateGame(state);

  const questionType = state.questions[state.currentQuestion].type;
  defineHandler(questionType, questionElement, userEventHandler);

  changeScreen(gameContainerElement);
};

export default startGame;
