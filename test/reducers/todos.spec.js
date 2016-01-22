import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import todos from 'reducers/todos';

describe("Todos reducer", () => {

  context("when an 'ADD_TODO' action is dispatched", () => {
    const action = {
      type: 'ADD_TODO',
      id: 1,
      text: 'Watch more movies'
    };

    deepFreeze(action);

    it("adds a new todo", () => {
      const stateBefore = [
        {
          id: 0,
          text: 'Have fun with Redux',
          completed: false
        }
      ];

      const stateAfter = [
        {
          id: 0,
          text: 'Have fun with Redux',
          completed: false
        },
        {
          id: 1,
          text: 'Watch more movies',
          completed: false
        }
      ];

      deepFreeze(stateBefore);

      expect(
        todos(stateBefore, action)
      ).to.be.eql(stateAfter);
    });
  });

  context("when receiving an undefined state", () => {
    const undefinedState = undefined;

    it("returns the initial state", () => {
      const whateverAction = {};
      const initialState = [];

      deepFreeze(whateverAction);

      expect(
        todos(undefinedState, whateverAction)
      ).to.be.eql(initialState);
    });
  });

});
