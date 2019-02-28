import IntroView from "./intro-view";
import Application from "../../application";

export default () => {
  const view = new IntroView();
  view.asteriskClickHandler = Application.showGreeting;
  return view.element;
};
