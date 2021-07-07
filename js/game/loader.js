import adaptData from "./adapt-data";

const Status = {
  OK: 200,
  REDIRECT: 300
};

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const DEFAUL_NAME = `Player`;
const APP_ID = 1234567;

const checkStatus = (response) => {
  if (response.status >= Status.OK && response.status < Status.REDIRECT) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

const toJson = (response) => {
  return response.json();
};

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
      .then(checkStatus)
      .then(toJson)
      .then(adaptData);
  }

  static loadResults(name = DEFAUL_NAME) {
    return fetch(`${SERVER_URL}/stats/:${APP_ID}-:${name}`)
      .then(checkStatus)
      .then(toJson);
  }

  static saveResults(results, name = DEFAUL_NAME) {
    const totalResults = Object.assign({}, results, {name});

    const requestSettings = {
      body: JSON.stringify(totalResults),
      headers: {
        "Content-Type": `application/json`
      },
      method: `POST`
    };

    return fetch(
        `${SERVER_URL}/stats/:${APP_ID}-:${name}`,
        requestSettings
    ).then(checkStatus);
  }
}
