import React       from 'react';
import { connect } from 'react-redux';

import TodoList from '../presentational/TodoList.jsx';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
  }
};

/*
 * Returns the Props for the Presentational Component
 * calculated from the 'state' of the Redux Store.
 * These Props will be updated any time the 'state' changes.
 */
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};

/*
 * Returns the callback Props needed for the Presentational Component,
 * using the Redux Store's 'dispatch' method to dispatch actions.
 * These Props will be updated any time the 'state' changes.
*/
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch({
        type: 'TOGGLE_TODO',
        id
      });
    }
  }
};

/*
 * Create the VisibleTodoList Container Component from:
 *   - mapStateToProps
 *   - mapDispatchToProps
 *   - TodoList
 * (TodoList is the Presentational Component I want to connect to the Redux Store)
 *
 * Calculates the Props to pass to the Presentational Component (TodoList) by merging:
 *   - the objects returned from
 *     * mapStateToProps
 *     * mapDispatchToProps
 *   - its own (TodoList) Props
 */
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
