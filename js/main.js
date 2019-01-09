import {changeScreen} from "./util/util";
import IntroView from "./pages/intro-view";

const intro = new IntroView();
changeScreen(intro.element);
