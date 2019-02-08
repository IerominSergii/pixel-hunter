import {changeScreen} from "./util/util";
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
    this.endGame = (name, answers, lives, results) => {
      this.showStats(name, answers, lives, results);
    };
  }

  showIntro() {
    const intro = new IntroView(this.onIntroClick);
    changeScreen(intro.element);
  }

  startGame() {
    const model = new Model();
    const presenter = new Presenter(model);
    presenter.endGameCallback = this.endGame;
    model.questions = questions;

    changeScreen(presenter.element);
    presenter.initGame();
  }

  showStats(name, answers, lives, results) {
    const statsElement = new StatsView(name, answers, lives, results).element;
    this.presenter.renderToSubContainer(statsElement);
  }
}
