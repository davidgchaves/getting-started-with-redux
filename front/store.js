import { createStore } from 'redux';
import todoApp from './reducers/todoApp';

const store = createStore(todoApp);

export default store;
