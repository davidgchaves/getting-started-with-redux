const todos = (prevState = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...prevState,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return prevState.map(todo => {
        return (todo.id !== action.id)
          ? todo
          : { ...todo, completed: !todo.completed };
      });
    default:
      return prevState;
  }
};

export default todos;
