import QuestionSingleView from "../templates/question-single-view";
import QuestionTwice from "../templates/question-twice-view";
import QuestionTriple from "../templates/question-triple-view";

const SINGLE_OPTION_INDEX = 0;

export default (type, options, callback) => {
  switch (type) {
    case `single`:
      return new QuestionSingleView(options[SINGLE_OPTION_INDEX], callback)
        .element;
    case `twice`:
      return new QuestionTwice(options, callback).element;
    case `triple`:
      return new QuestionTriple(options, callback).element;
    default:
      throw new Error(`Unknown question type`);
  }
};
