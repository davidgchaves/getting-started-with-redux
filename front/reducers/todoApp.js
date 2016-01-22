import todos from 'reducers/todos';
import visibilityFilter from 'reducers/visibilityFilter';

const todoApp = (prevState = {}, action) => {
  return {
    todos: todos(prevState.todos, action),
    visibilityFilter: visibilityFilter(prevState.visibilityFilter, action)
  };
};

export default todoApp;
