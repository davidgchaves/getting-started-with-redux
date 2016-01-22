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

    default:
      return prevState;
  }
};

export default todos;