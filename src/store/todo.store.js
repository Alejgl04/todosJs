import { Todo } from "../todos/models/todo.models";

const Filters = {
  All: 'all',
  Completed: 'completed',
  Pending: 'pending',
}

const state = {
  todos: [
    new Todo('Piedra de alma'),
    new Todo('Piedra de infinito'),
    new Todo('Piedra de tiempo'),
    new Todo('Piedra de poder'),
    new Todo('Piedra de realidad'),
  ],
  filter: Filters.All,
}

const initStore = () => {

  loadStore();
  console.log('InitStore <3');

}

const loadStore = () => {
  
  if ( !localStorage.getItem('state') ) return;
  
  const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );

  state.todos = todos;
  state.filter = filter;

}


const saveStateToLocalStorage = () => {
  
  localStorage.setItem('state', JSON.stringify(state));

}

const getTodos = ( filter = Filters.All ) => {
 
  switch ( filter ) {
    case Filters.All:
      return [...state.todos];
    
    case Filters.Completed:
      return state.todos.filter( todo => todo.done )
    
    case Filters.Pending:
      return state.todos.filter( todo => !todo.done )

    default:
      throw new Error(`Option ${ filter } is not valid`);
  }

}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {

  if ( !description ) throw new Error('Description is required');

  state.todos.push( new Todo( description ) );
  saveStateToLocalStorage();

}

const toggleTodo = ( todoId ) => {

  state.todos = state.todos.map( todo => {

    if( todo.id === todoId ) {

      todo.done = !todo.done;

    }
    
    return todo;

  });
  saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) => {
  
  state.todos = state.todos.filter( todo => todo.id !== todoId );
  saveStateToLocalStorage();

}

const deleteTodoCompleted = () => {
  
  state.todos = state.todos.filter( todo => todo.done );
  saveStateToLocalStorage();
}

const setFilterTodo = ( newfilter = Filters.All ) => {

  state.filter = newfilter;
  saveStateToLocalStorage();

}

const getCurrentFilter = () => {
  return state.filter;
}

export default {

  addTodo,
  deleteTodo,
  deleteTodoCompleted,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilterTodo,
  toggleTodo,

}