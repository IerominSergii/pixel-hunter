import StatsView from "./stats-view";
import Application from "../..//application";

export default (name, answers, lives, results) => {
  const view = new StatsView(name, answers, lives, results);
  view.onBackButtonClick = Application.showGreeting;

  return view.element;
};
