import {assert} from "chai";
import resetTimer from "./reset-timer";
import {DEFAULT_TIMER, getInitialState} from "../game/configuration";

const state = getInitialState();

describe(`resetTimer`, () => {
  it(`should set the default timer value`, () => {
    assert.equal(resetTimer(state).timer, DEFAULT_TIMER);
  });
});
