import RulesView from "../rules/rules-view";
import Application from "../../application";

export default () => {
  const view = new RulesView();
  view.onSubmit = (name) => {
    Application.startGame(name);
  };

  return view.element;
};
