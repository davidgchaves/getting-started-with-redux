import React           from 'react';
import ReactDOM        from 'react-dom';
import { createStore } from 'redux';

import todoApp from './reducers/todoApp';
import TodoApp from './components/TodoApp.jsx';

ReactDOM.render(
  <TodoApp store={createStore(todoApp)} />,
  document.getElementById('todo-app')
);
