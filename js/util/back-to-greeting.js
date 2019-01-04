import greetingScreen from "../pages/greeting";
import {changeScreen} from "./util";

export default (element) => {
  const backButtonClickHandler = () => {
    changeScreen(greetingScreen);
  };

  element
    .querySelector(`.back`)
    .addEventListener(`click`, backButtonClickHandler);
};
