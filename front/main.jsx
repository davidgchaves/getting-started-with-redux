import React    from 'react';
import ReactDOM from 'react-dom';
import store   from './store';
import TodoApp from './components/TodoApp.jsx';

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById('todo-app')
  );
};

store.subscribe(render);
render();
