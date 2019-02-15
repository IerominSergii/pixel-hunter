import {changeScreen, createElement} from "./util/util";
import IntroView from "./pages/intro-view";
import StatsView from "./pages/stats-view";
import Model from "./model";
import questionsData from "./data/data";
import Presenter from "./presenter";
import HeaderView from "./views/header-view";

const questions = questionsData();

export default class Application {
  showIntro() {
    const intro = new IntroView(this.startGame);
    changeScreen(intro.element);
  }

  startGame() {
    const model = new Model();
    model.questions = questions;
    const presenter = new Presenter(model);

    changeScreen(presenter.element);
    presenter.initGame();
  }

  static showStats(name, answers, lives, results) {
    const statsContainer = createElement();
    statsContainer.appendChild(new HeaderView(this.startGame).element);
    statsContainer.appendChild(
        new StatsView(name, answers, lives, results).element
    );
    changeScreen(statsContainer);
  }
}
