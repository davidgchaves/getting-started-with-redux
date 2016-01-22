import todos from 'reducers/todos';
import visibilityFilter from 'reducers/visibilityFilter';

const todoApp = (prevState = {}, action) => {
  return {
    todos: todos(prevState.todos, action),
    visibilityFilter: prevState.visibilityFilter
  };
};

export default todoApp;
