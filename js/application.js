import {changeScreen} from "./util/util";
import IntroView from "./pages/intro-view";
import GreetingView from "./pages/greeting-view";
import RulesView from "./pages/rules-view";
import StatsView from "./pages/stats-view";
import Model from "./model";
import questionsData from "./data/data";
import Presenter from "./presenter";

const questions = questionsData();

export default class Application {
  static showIntro() {
    changeScreen(new IntroView().element);
  }

  static showGreeting() {
    changeScreen(new GreetingView().element);
  }

  static showRules() {
    changeScreen(new RulesView().element);
  }

  static startGame(name) {
    const model = new Model();
    model.questions = questions;
    model.name = name;
    const presenter = new Presenter(model);

    changeScreen(presenter.element);
    presenter.playGame();
  }

  static showStats(name, answers, lives, results) {
    changeScreen(new StatsView(name, answers, lives, results).element);
  }
}
