export default (questions) => {
  if (!Array.isArray(questions)) {
    throw new Error(`Questions should be an array type`);
  }

  const questionsTypes = {
    "two-of-two": `twice`,
    "tinder-like": `single`,
    "one-of-three": `triple`
  };

  const answersTypes = {
    photo: `photo`,
    painting: `paint`
  };

  return questions.map((question) => {
    const newQuestion = {};
    newQuestion.type = questionsTypes[question.type];
    newQuestion.options = question.answers.map((answer) => {
      return {src: answer.image.url, thisIs: answersTypes[answer.type]};
    });

    return newQuestion;
  });
};
