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
      .then((questionsData) => {
        questions = questionsData;
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
    const result = {
      answers,
      lives
    };
    Loader.saveResults(result, name)
      .then(() => Loader.loadResults(name))
      .then((allResults) => {
        changeScreen(statsPresenter(name, allResults, questionsLength));
      });
  }
}
