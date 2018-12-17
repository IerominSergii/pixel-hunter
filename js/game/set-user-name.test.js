import {assert} from "chai";
import setUserName from "./../game/set-user-name";
import {getInitialState} from "./configuration";

describe(`setUserName`, () => {
  it(`should set new userName`, () => {
    assert.equal(setUserName(getInitialState(), `Anton`).name, `Anton`);
    assert.equal(
        setUserName(getInitialState(), `Oleg Vadimovich`).name,
        `Oleg Vadimovich`
    );
  });
  it(`should not allow not string userName type`, () => {
    assert.throws(() => {
      setUserName(getInitialState(), null);
    }, /userName should be string type/);
    assert.throws(() => {
      setUserName(getInitialState(), 11);
    }, /userName should be string type/);
    assert.throws(() => {
      setUserName(getInitialState(), {});
    }, /userName should be string type/);
    assert.throws(() => {
      setUserName(getInitialState(), []);
    }, /userName should be string type/);
  });
});
