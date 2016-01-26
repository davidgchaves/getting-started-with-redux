import React           from 'react';
import ReactDOM        from 'react-dom';
import { createStore } from 'redux';

import todoApp from './reducers/todoApp';
import { Provider, TodoApp } from './components/TodoApp.jsx';

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider> ,
  document.getElementById('todo-app')
);
