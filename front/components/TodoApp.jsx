import React, { Component } from 'react';
//import store from '../store';

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

const Link = ({ active, children, onClick }) => {
  const renderAsText = <span>{children}</span>;
  const renderAsLink = (
    <a
      href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );

  return active ? renderAsText : renderAsLink;
};

const Footer = ({ store }) => (
  <p>
    Show:
    {' '}
    <FilterLink filter='SHOW_ALL' store={store}>
      All
    </FilterLink>
    {' '}
    <FilterLink filter='SHOW_ACTIVE' store={store}>
      Active
    </FilterLink>
    {' '}
    <FilterLink filter='SHOW_COMPLETED' store={store}>
      Completed
    </FilterLink>
  </p>
);
/*
 * END PRESENTATIONAL COMPONENTS
 */

/*
 * CONTAINER COMPONENTS
 */
class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = props;
    const state = store.getState();

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}

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

class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = props;
    const state = store.getState();

    return (
      <TodoList
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    );
  }
}

const TodoApp = ({ store }) => (
  <div>
    <AddTodo store={store} />
    <VisibleTodoList store={store} />
    <Footer store={store} />
  </div>
);
/*
 * END CONTAINER COMPONENTS
 */

/*
 * COMPONENTS
 */
let nextTodoId = 0;
const AddTodo = ({ store }) => {
  let input;

  return (
    <div>
      <input ref={node => { input = node; }}></input>
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: input.value
        })
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};
/*
 * END COMPONENTS
 */

export default TodoApp;
