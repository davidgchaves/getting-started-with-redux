import React, { Component } from 'react';
import { Provider }         from 'react-redux';

import Footer from './presentational/Footer.jsx';
import VisibleTodoList from './container/VisibleTodoList.jsx';

/*
 * CONTAINER COMPONENTS
 */
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
