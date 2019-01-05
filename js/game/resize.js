export const resize = (frame, image) => {
  const proportionWidth = 1 / (image.width / frame.width);
  const proportionHeight = 1 / (image.height / frame.height);

  const moreValueableProportion =
    proportionWidth < proportionHeight ? proportionWidth : proportionHeight;

  const newImage = {};
  newImage.width = image.width * moreValueableProportion;
  newImage.height = image.height * moreValueableProportion;

  return newImage;
};
