import {changeScreen} from "./util/util";
import IntroView from "./pages/intro-view";
import initGame from "./game/start-game";

const intro = new IntroView();
intro.asteriskClickHandler = initGame;
changeScreen(intro.element);
