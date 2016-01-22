import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import todos from 'reducers/todos';

describe("Todos reducer", () => {

  context("when an 'ADD_TODO' action is dispatched", () => {
    const addTodoAction = {
      type: 'ADD_TODO',
      id: 1,
      text: 'Watch more movies'
    };

    deepFreeze(addTodoAction);

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
        todos(stateBefore, addTodoAction)
      ).to.be.eql(stateAfter);
    });
  });

  context("when a 'TOGGLE_TODO' action is dispatched", () => {
    const toggleTodoAction = {
      type: 'TOGGLE_TODO',
      id: 1
    };

    deepFreeze(toggleTodoAction);

    it("toggles the completed field from selected todo", () => {
      const stateBefore = [
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

      const stateAfter = [
        {
          id: 0,
          text: 'Have fun with Redux',
          completed: false
        },
        {
          id: 1,
          text: 'Watch more movies',
          completed: true
        }
      ];

      deepFreeze(stateBefore);

      expect(
        todos(stateBefore, toggleTodoAction)
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

  context("when an unknown action is dispatched", () => {
    const unknownAction = {
      type: 'WHATEVER'
    };

    deepFreeze(unknownAction);

    it("return the current state", () => {
      const stateBefore = [
        {
          id: 0,
          text: 'Have fun with Redux',
          completed: false
        }
      ];

      deepFreeze(stateBefore);

      expect(
        todos(stateBefore, unknownAction)
      ).to.be.eql(stateBefore);
    });
  });

});
