import {assert} from "chai";
import adaptData from "./adapt-data";

const serverData = [
  {
    type: `two-of-two`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        image: {
          url: `http://placehold.it/468x458`,
          width: 468,
          height: 458
        },
        type: `photo`
      },
      {
        image: {
          url: `http://placehold.it/468x458`,
          width: 468,
          height: 458
        },
        type: `painting`
      }
    ]
  },
  {
    type: `tinder-like`,
    question: `Угадай, фото или рисунок?`,
    answers: [
      {
        image: {
          url: `http://placehold.it/705x455`,
          width: 705,
          height: 455
        },
        type: `photo`
      }
    ]
  },
  {
    type: `one-of-three`,
    question: `Найдите рисунок среди изображений`,
    answers: [
      {
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        type: `photo`
      },
      {
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        type: `painting`
      },
      {
        image: {
          url: `http://placehold.it/304x455`,
          width: 304,
          height: 455
        },
        type: `photo`
      }
    ]
  }
];

const localData = [
  {
    type: `twice`,
    options: [
      {
        src: `http://placehold.it/468x458`,
        thisIs: `photo`
      },
      {
        src: `http://placehold.it/468x458`,
        thisIs: `painting`
      }
    ]
  },
  {
    type: `single`,
    options: [
      {
        src: `http://placehold.it/705x455`,
        thisIs: `photo`
      }
    ]
  },
  {
    type: `triple`,
    options: [
      {
        src: `http://placehold.it/304x455`,
        thisIs: `photo`
      },
      {
        src: `http://placehold.it/304x455`,
        thisIs: `painting`
      },
      {
        src: `http://placehold.it/304x455`,
        thisIs: `photo`
      }
    ]
  }
];

describe(`dataAdapter`, () => {
  it(`should be deepEqual: localData to serverAdaptedData`, () => {
    assert.deepEqual(localData, adaptData(serverData));
  });
});
