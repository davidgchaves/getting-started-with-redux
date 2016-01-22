import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import visibilityFilter from 'reducers/visibilityFilter';

describe("VisibilityFilter reducer", () => {

  context("when receiving an undefined state", () => {
    const undefinedState = undefined;

    it("returns the initial state", () => {
      const whateverAction = {};
      const initialState = 'SHOW_ALL';

      deepFreeze(whateverAction);

      expect(
        visibilityFilter(undefinedState, whateverAction)
      ).to.be.eql(initialState);
    });
  });

});
