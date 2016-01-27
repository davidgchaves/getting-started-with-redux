import React        from 'react';
import { connect } from 'react-redux';

let nextTodoId = 0;

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => { input = node; }}></input>
      <button onClick={() => {
        dispatch({
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
 * const mapStateToProps = (state) => {
 *   return {};
 * };
 *
 * const mapDispatchToProps = (dispatch) => {
 *   return { dispatch };
 * };
 *
 * AddTodo = connect(
 *   mapStateToProps,
 *   mapDispatchToProps
 * )(AddTodo);
 *
 * It is wasteful to even subscribe to the Redux Store
 * if we don't calculate any Props from its state:
 *   - Replace mapStateToProps with a null
 *     (there is no need to subscribe to the Redux Store)
 * It is a common pattern to just inject the 'dispatch' function,
 * and 'connect' is aware of this fact, you just need to:
 *   - Replace mapDispatchToProps with a null
 *
 * AddTodo = connect(
 *   null,
 *   null
 * )(AddTodo);
 *
 * Or even better, leverage the default behaviour of 'connect':
 *   - Do not subscribe to the Redux Store
 *   - Inject only the 'dispatch' function as a Prop
 */
AddTodo = connect()(AddTodo);

export default AddTodo;
