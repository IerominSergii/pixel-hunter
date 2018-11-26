import greetingScreen from "./../pages/greeting";
import {changeScreen} from "./util";

const addEventListenerToBackArrow = (element) => {
  const backButton = element.querySelector(`.back`);

  const backButtonClickHandler = () => {
    changeScreen(greetingScreen);
  };

  backButton.addEventListener(`click`, backButtonClickHandler);
};

export default addEventListenerToBackArrow;
