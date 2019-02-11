import {changeScreen, clearChildren} from "./util/util";
import IntroView from "./pages/intro-view";
import StatsView from "./pages/stats-view";
import Model from "./model";
import questionsData from "./data/data";
import Presenter from "./presenter";

const questions = questionsData();

export default class Application {
  constructor() {
    this.onIntroClick = () => {
      this.startGame();
    };
    this.endGame = (name, answers, lives, results, goBackCallback) => {
      this.showStats(name, answers, lives, results, goBackCallback);
    };
  }

  showIntro() {
    const intro = new IntroView(this.onIntroClick);
    changeScreen(intro.element);
  }

  startGame() {
    const model = new Model();
    model.questions = questions;
    const presenter = new Presenter(model);
    presenter.endGameCallback = this.endGame;

    changeScreen(presenter.element);
    presenter.initGame();
  }

  static showStats(name, answers, lives, results, container) {
    const statsElement = new StatsView(name, answers, lives, results).element;
    clearChildren(container);
    container.appendChild(statsElement);
  }
}
