import {changeScreen} from "./util/util";
import IntroView from "./pages/intro-view";
import StatsView from "./pages/stats-view";
import Model from "./model";
import questionsData from "./data/data";
import Presenter from "./presenter";

const questions = questionsData();

export default class Application {
  constructor() {
    this.model = new Model();
    this.presenter = new Presenter(this.model);
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
    this.presenter.endGameCallback = this.endGame;
    this.model.setQuestions(questions);
    changeScreen(this.presenter.element);
    this.presenter.initGame();
  }

  showStats(name, answers, lives, results) {
    const statsElement = new StatsView(name, answers, lives, results).element;
    this.presenter.renderToSubContainer(statsElement);
  }
}
