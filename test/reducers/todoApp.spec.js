import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import todoApp from 'reducers/todoApp';

describe("TodoApp reducer", () => {

  context("when dispatching a todos related action", () => {
    const todosRelatedAction = {
      type: 'ADD_TODO',
      id: 1,
      text: 'Watch more movies'
    };
    deepFreeze(todosRelatedAction);

    it("delegates to the Todos reducer", () => {
      const stateBefore = {
        todos: [
          {
            id: 0,
            text: 'Have fun with Redux',
            completed: false
          }
        ],
        visibilityFilter: 'WHATEVER'
      };

      const stateAfter = {
        todos: [
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
        ],
        visibilityFilter: 'WHATEVER'
      };

      deepFreeze(stateBefore);

      expect(
        todoApp(stateBefore, todosRelatedAction)
      ).to.be.eql(stateAfter);
    });
  });

  context("when receiving an undefined state", () => {
    const undefinedState = undefined;

    it("returns the initial state", () => {
      const whateverAction = {};
      const initialState = {
        todos: [],
        visibilityFilter: undefined
      };

      deepFreeze(whateverAction);

      expect(
        todoApp(undefinedState, whateverAction)
      ).to.be.eql(initialState);
    });
  });

});
