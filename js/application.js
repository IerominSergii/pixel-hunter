import {changeScreen} from "./util/util";
import Model from "./model";

import Presenter from "./presenter";
import introPresenter from "./pages/intro/intro-presenter";
import greetingPresenter from "./pages/greeting/greeting-presenter";
import rulesPresenter from "./pages/rules/rules-presenter";
import statsPresenter from "./pages/stats/stats-presenter";

// const questions = questionsData();
let questions;

export default class Application {
  static showIntro() {
    changeScreen(introPresenter());
    const serverQuestions = fetch(
        `https://es.dump.academy/pixel-hunter/questions`
    );

    serverQuestions.then((response) => {
      questions = response;
      Application.showGreeting();
    });
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
