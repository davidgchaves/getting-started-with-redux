# Notes on *Dan Abramov's Course: Getting Started with Redux*

## Links

- [Notes (and partial transcription)](https://github.com/tayiorbeii/egghead.io_redux_course_notes)

## 1. Array immutability

### The `addCounter` `reducer`

#### 1. Mutating the input list

```javascript
const addCounter = (list) => {
  list.push(0);
  return list;
};
```

#### 2. Copying the input list with `concat`

```javascript
const addCounter = (list) => {
  return list.concat([0]);
};
```

#### 3. Copying the input list with the ES6 Spread Operator

```javascript
const addCounter = (list) => {
  return [...list, 0];
};
```

### Testing the `addCounter` `reducer`

```javascript
const testAddCounter = () => {
  const listBefore = [];
  const listAfter  = [0];

  deepFreeze(listBefore);

  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};
```

### The `removeCounter` `reducer`

#### 1. Mutating the input list with `splice`

```javascript
const removeCounter = (list, index) => {
  list.splice(index, 1);
  return list;
};
```

#### 2. Copying the input list with `slice` and `concat`

```javascript
const removeCounter = (list, index) => {
  return list
    .slice(0, index)
    .concat(list.slice(index + 1));
};
```

#### 3. Copying the input list with and `slice` and the ES6 Spread Operator

```javascript
const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ];
};
```

### Testing the `removeCounter` `reducer`

```javascript
const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter  = [0, 20];

  deepFreeze(listBefore);

  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
};
```

### The `incrementCounter` `reducer`

#### 1. Mutating the input list

```javascript
const incrementCounter = (list, index) => {
  list[index] += 1;
  return list;
};
```

#### 2. Copying the input list with `slice` and `concat`

```javascript
const incrementCounter = (list, index) => {
  return list
    .slice(0, index)
    .concat([list[index] + 1])
    .concat(list.slice(index + 1));
};
```

#### 3. Copying the input list with and `slice` and the ES6 Spread Operator

```javascript
const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
   ];
};
```

### Testing the `incrementCounter` `reducer`

```javascript
const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter  = [0, 11, 20];

  deepFreeze(listBefore);

  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter);
};
```


## 2. Object immutability

### The `toggleTodo` `reducer`

#### 1. Mutating the input object

```javascript
const toggleTodo = (todo) => {
  todo.completed = !todo.completed;
  return todo;
}
```

#### 2. Manually copying the input object

```javascript
const toggleTodo = (todo) => {
  return {
    id: todo.id,
    text: todo.text,
    completed: !todo.completed
  };
};
```

#### 3. Copying the input object with ES6 `Object.assign`

```javascript
const toggleTodo = (todo) => {
  return Object.assign(
    {},
    todo,
    { completed: !todo.completed }
  );
};
```

#### 4. Copying the input object with stage-2 ES7 Object Spread Operator

```javascript
const toggleTodo = (todo) => {
  return {
    ...todo,
    completed: !todo.completed
  };
};
```

### Testing the `toggleTodo` `reducer`

```javascript
const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: "Playing with REDUX",
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: "Playing with REDUX",
    completed: true
  };

  deepFreeze(todoBefore);

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
};
```

## 3. A simple `react` and `redux` app

### The `counter` `reducer`

A pure function with no dependency whatsoever to `redux` nor `react`.

`counterReducer.js`

```javascript
const counter = (prevState = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return prevState + 1;
    case "DECREMENT":
      return prevState - 1;
    default:
      return prevState;
  }
};

export default counter;
```

### Testing the `counter` `reducer`

```javascript
expect(counter(0, { type: "INCREMENT" })).toEqual(1);
expect(counter(4, { type: "INCREMENT" })).toEqual(5);
expect(counter(6, { type: "DECREMENT" })).toEqual(5);
expect(counter(2, { type: "DECREMENT" })).toEqual(1);
expect(counter(8, { type: "UNKNOWN36" })).toEqual(8);
expect(counter(undefined, {}           )).toEqual(0);
```

### The `redux` `store`

`counterStore.js`

```javascript
import createStore from 'redux';
import counter from './counterReducer';

const store = createStore(counter);

export default store
```

### The `presentational` `counter` component

A `presentational` component:

- Is a simple function (supported since `React 0.14`).
- Does not contain any business logic.
- Specifies:
	- How the current state is transformed into renderable output.
	- How the callbacks passed via props are bound to the event handlers

`Counter.jsx`

```javascript
import React from 'react'

const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1>{value}</h1>
	 <button onClick={onIncrement}>+</button>
	 <button onClick={onDecrement}>-</button>
  </div>
);

export default Counter;
```

### All together now!

`index.jsx`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import store from './counterStore';

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
      onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
    />,
    document.getElementById('app')
  );
};

// SUBSCRIBE TO THE STORE
store.subscribe(render);

// RENDER THE INITIAL STATE
render();
```

## 4. `Redux` `store` demystified

### Roll your own `createStore` constructor

**`createStore(reducer)`** returns a `store` with:

- **`getState()`**:
	- retrieves the current state of the `store`.
- **`dispatch(action)`**:
	- `dispatch`es `action`s to `reducer`s (to change the state of the `store`).
- **`subscribe(listener)`**:
	- executes the `listener` anytime an `action` has been `dispatch`ed to a `reducer` (so we can update the UI).
	- returns a function that can be invoked to unsubscribe the `listener`.

```javascript
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState  = () => state;

  const dispatch  = (action) => {
    state = reducer(state, action);
    listeners.forEach(l => l());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // Populate the initial state, before returning the store
  dispatch({});

  return { getState, dispatch, subscribe };
};
```

### Interacting with our own `createStore`

```javascript

// ACTIONS
const increment = { type: "INCREMENT" };
const decrement = { type: "DECREMENT" };

// THE STORE
const store = createStore(counter);

// INTERACTION
console.log(store.getState());
store.dispatch(increment);
store.dispatch(increment);
store.dispatch(decrement);
console.log(store.getState());
```

### Subcribing to the `store`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

// ACTIONS
const increment = { type: "INCREMENT" };

// THE STORE
const store = createStore(counter);

// THE PRESENTATIONAL COMPONENT
const Counter = ({ value }) => <h1>{value}</h1>;

// THE CUSTOM RENDER FUNCTION
const render = () => {
  ReactDOM.render(
    <Counter value={store.getState()} />,
    document.getElementById('app')
  );
};

// SUBSCRIBING TO THE STORE
store.subscribe(render);

// RENDERING THE INITIAL STATE
render();

// HOOK TO A CLICK EVENT TO DISPATCH ACTIONS
document.addEventListener(
  'click',
  () => { store.dispatch(increment); }
);
```
