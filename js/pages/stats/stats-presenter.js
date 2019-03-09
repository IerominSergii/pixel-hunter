import StatsView from "./stats-view";
import Application from "../../application";
import countPoints from "../../game/count-points";

export default (name, data, questionsLength) => {
  const dataWithResults = data.map((it) => {
    const results = countPoints(it.answers, it.lives, questionsLength);
    it.results = results;
    return it;
  });

  const view = new StatsView(name, dataWithResults);
  view.onBackButtonClick = Application.showGreeting;

  return view.element;
};
