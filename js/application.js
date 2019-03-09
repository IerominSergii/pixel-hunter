import {changeScreen} from "./util/util";
import Model from "./model";

import Presenter from "./presenter";
import introPresenter from "./pages/intro/intro-presenter";
import greetingPresenter from "./pages/greeting/greeting-presenter";
import rulesPresenter from "./pages/rules/rules-presenter";
import statsPresenter from "./pages/stats/stats-presenter";
import Loader from "./game/loader";

let questions;

export default class Application {
  static showIntro() {
    changeScreen(introPresenter());

    Loader.loadData()
      .then((data) => {
        questions = data;
      })
      .then(Application.showGreeting());
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

  static showStats(name, answers, lives, questionsLength) {
    const resultData = {
      answers,
      lives
    };
    Loader.saveResults(resultData, name)
      .then(() => Loader.loadResults(name))
      .then((data) => {
        changeScreen(statsPresenter(name, data, questionsLength));
      });
  }
}
