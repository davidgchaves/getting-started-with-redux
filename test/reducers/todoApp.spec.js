import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import todoApp from 'reducers/todoApp';

describe("TodoApp reducer", () => {

  context("when receiving an undefined state", () => {
    const undefinedState = undefined;

    it("returns the initial state", () => {
      const whateverAction = {};
      const initialState = {};

      deepFreeze(whateverAction);

      expect(
        todoApp(undefinedState, whateverAction)
      ).to.be.eql(initialState);
    });
  });

});
