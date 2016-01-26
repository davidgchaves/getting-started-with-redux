import React, { Component } from 'react';
import { Provider }         from 'react-redux';

import TodoList from './presentational/TodoList.jsx';
import Footer from './presentational/Footer.jsx';

/*
 * CONTAINER COMPONENTS
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

class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
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
VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
};

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);
/*
 * END CONTAINER COMPONENTS
 */

/*
 * COMPONENTS
 */
let nextTodoId = 0;
const AddTodo = (props, { store }) => {
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
AddTodo.contextTypes = {
  store: React.PropTypes.object
};
/*
 * END COMPONENTS
 */

export default TodoApp;
