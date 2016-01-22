import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import visibilityFilter from 'reducers/visibilityFilter';

describe("VisibilityFilter reducer", () => {

  context("when a 'SET_VISIBILITY_FILTER' action is dispatched", () => {
    const setVisibilityFilterAction = {
      type: 'SET_VISIBILITY_FILTER',
      filter: 'SHOW_COMPLETED'
    };

    deepFreeze(setVisibilityFilterAction);

    it("sets the visibility filter", () => {
      const stateBefore = 'SHOW_ALL';
      const stateAfter = 'SHOW_COMPLETED';
      deepFreeze(stateBefore);

      expect(
        visibilityFilter(stateBefore, setVisibilityFilterAction)
      ).to.be.eql(stateAfter);
    });
  });

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
