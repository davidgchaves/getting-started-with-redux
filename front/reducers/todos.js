const todos = (prevState = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...prevState,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return prevState.map(t => todo(t, action));
    default:
      return prevState;
  }
};

const todo = (prevState, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      return (prevState.id !== action.id)
        ? prevState
        : { ...prevState, completed: !prevState.completed };
  }
};

export default todos;
