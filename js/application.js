import {changeScreen} from "./util/util";
import Model from "./model";
import questionsData from "./data/data";
import Presenter from "./presenter";
import introPresenter from "./pages/intro/intro-presenter";
import greetingPresenter from "./pages/greeting/greeting-presenter";
import rulesPresenter from "./pages/rules/rules-presenter";
import statsPresenter from "./pages/stats/stats-presenter";

const questions = questionsData();

export default class Application {
  static showIntro() {
    changeScreen(introPresenter());
  }

  static showGreeting() {
    changeScreen(greetingPresenter());
  }

  static showRules() {
    changeScreen(rulesPresenter());
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
    changeScreen(statsPresenter(name, answers, lives, results));
  }
}
