import greetingScreen from "../pages/greeting";
import {changeScreen} from "./util";

const addEventListenerToBackArrow = (element) => {
  const backButtonClickHandler = () => {
    changeScreen(greetingScreen);
  };

  element
    .querySelector(`.back`)
    .addEventListener(`click`, backButtonClickHandler);
};

export default addEventListenerToBackArrow;
