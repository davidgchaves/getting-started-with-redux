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

  context("when dispatching a visibility filter related action", () => {
    const visibilityFilterRelatedAction = {
      type: 'SET_VISIBILITY_FILTER',
      filter: 'SHOW_COMPLETED'
    };
    deepFreeze(visibilityFilterRelatedAction);

    it("delegates to the VisibilityFilter reducer", () => {
      const stateBefore = {
        visibilityFilter: 'SHOW_ALL',
        todos: []
      };
      const stateAfter = {
        visibilityFilter: 'SHOW_COMPLETED',
        todos: []
      };
      deepFreeze(stateBefore);

      expect(
        todoApp(stateBefore, visibilityFilterRelatedAction)
      ).to.be.eql(stateAfter);
    });
  });

  context("when receiving an undefined state", () => {
    const undefinedState = undefined;

    it("returns the initial state", () => {
      const whateverAction = {};
      const initialState = {
        todos: [],
        visibilityFilter: 'SHOW_ALL'
      };

      deepFreeze(whateverAction);

      expect(
        todoApp(undefinedState, whateverAction)
      ).to.be.eql(initialState);
    });
  });

});
