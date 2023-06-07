import { Todo } from "../todos/models/todo.models";

const Filters = {
  All: 'all',
  Completed: 'completed',
  Pending: 'pending',
}

const state = {
  todos: [
    new Todo('Piedra del alma'),
    new Todo('Piedra del infinito'),
    new Todo('Piedra del tiempo'),

  ],
  filter: Filters.All,
}

const initStore = () => {

  console.log(state);
  console.log('InitStore <3');

}

const loadStore = () => {
  throw new Error('Not implement');
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

}

const toggleTodo = ( todoId ) => {
  throw new Error('Not implement');
}

const deleteTodo = ( todoId ) => {
  
  state.todos = state.todos.filter( todo => todo.id !== todoId );
  
}

const deleteTodoCompleted = () => {
  
  state.todos = state.todos.filter( todo => todo.done );
  
}

const setFilterTodo = ( newfilter = Filters.All ) => {

  state.filter = newfilter;

}

const getCurrentFilter = () => {
  throw new Error('Not implement');
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