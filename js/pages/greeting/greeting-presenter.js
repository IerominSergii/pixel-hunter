import GreetingView from "./greeting-view";
import Application from "../../application";

export default () => {
  const view = new GreetingView();
  view.continueClickHandler = Application.showRules;
  return view.element;
};
