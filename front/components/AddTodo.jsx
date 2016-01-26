import React        from 'react';
import { Provider } from 'react-redux';

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

export default AddTodo;
