import React, { Component } from 'react';
import store from '../store';

/*
 * PRESENTATIONAL COMPONENTS
 */
const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{textDecoration: completed ? 'line-through' : 'none'}}
  >
    {text}
  </li>
);

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
       <Todo
         key={todo.id}
         {...todo}
         onClick={() => onTodoClick(todo.id)}
       />
    )}
  </ul>
);

const AddTodo = ({ onAddClick }) => {
  let input;
  return (
    <div>
      <input ref={node => { input = node; }}></input>

      <button onClick={() => {
        onAddClick(input.value);
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};

const FilterLink = ({ filter, currentFilter, children, onClick }) => {
  const isActive = f => f === currentFilter;
  const renderText = <span>{children}</span>;
  const renderLink = (
    <a
      href='#'
      onClick={ (e) => {
        e.preventDefault();
        onClick(filter);
      }}
    >
      {children}
    </a>
  );

  return isActive(filter) ? renderText : renderLink;
};

const Footer = ({ visibilityFilter, onFilterClick }) => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      All
    </FilterLink>
    {' '}
    <FilterLink filter='SHOW_ACTIVE'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink filter='SHOW_COMPLETED'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Completed
    </FilterLink>
  </p>
);
/*
 * END PRESENTATIONAL COMPONENTS
 */

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

        <AddTodo
          onAddClick={text =>
            store.dispatch({
              type: 'ADD_TODO',
              id: nextTodoId++,
              text
            })
          }
        />

        <TodoList
          todos={visibleTodos}
          onTodoClick={id =>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id
            })
          } />

        <Footer
          visibilityFilter={visibilityFilter}
          onFilterClick={filter =>
            store.dispatch({
              type:'SET_VISIBILITY_FILTER',
              filter
            })
          }
        />

      </div>
    );
  }
}

export default TodoApp;
