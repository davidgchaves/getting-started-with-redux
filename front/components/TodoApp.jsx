import React from 'react';

import AddTodo         from './AddTodo.jsx';
import VisibleTodoList from './container/VisibleTodoList.jsx';
import Footer          from './presentational/Footer.jsx';

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default TodoApp;
