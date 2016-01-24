import React, { Component } from 'react';
import store from '../store';

const FilterLink = ({filter, currentFilter, children}) => {
  const isActive = f => f === currentFilter;
  const renderText = <span>{children}</span>;
  const renderLink = (
    <a href='#'
      onClick={ (e) => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        });
      }}
    >
      {children}
    </a>
  );

  return isActive(filter) ? renderText : renderLink;
};

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

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    const { todos, visibilityFilter } = this.props;
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);

    return (
      <div>

        <input ref={ (node) => { this._input = node; }}>
        </input>

        <button onClick={ () => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this._input.value,
            id: nextTodoId++
          });
          this._input.value = '';
        }}>
          Add Todo
        </button>

        <ul>
          {visibleTodos.map(
            todo =>
            <li key={todo.id}
                onClick={ () => {
                  store.dispatch({
                    type: 'TOGGLE_TODO',
                    id: todo.id
                  });
                }}
                style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
            >
              {todo.text}
            </li>
            )}
        </ul>

        <p>
          Show:
          {' '}
          <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter}>
            All
          </FilterLink>
          {' '}
          <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter}>
            Active
          </FilterLink>
          {' '}
          <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter}>
            Completed
          </FilterLink>
        </p>

      </div>
    );
  }
}

export default TodoApp;