import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { todoPending, renderTodos } from './use-cases/';


const ElementIds = { 
  clearCompleted: '.clear-completed',
  TodoList: '.todo-list',
  todoFilters: '.filter',
  newTodoInput: '#new-todo-input',
  peddingTodoLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

  const displaysTodos = () => {
    
    const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
    renderTodos( ElementIds.TodoList, todos );
    updatingPedingTodos()
    
  }

  const updatingPedingTodos = () => {
    todoPending( ElementIds.peddingTodoLabel );

  }

  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;    
    document.querySelector(elementId).append( app );
    displaysTodos();
  })();

  // Html references..
  const newDescriptionInput = document.querySelector( ElementIds.newTodoInput );
  const todoListUl          = document.querySelector( ElementIds.TodoList );
  const ClearCompleted      = document.querySelector( ElementIds.clearCompleted );
  const filterListItem      = document.querySelectorAll( ElementIds.todoFilters );

  newDescriptionInput.addEventListener('keyup', ( event ) => {
    
    if ( event.keyCode !== 13 ) return;
    if ( event.target.value.trim().length === 0 ) return;

    todoStore.addTodo( event.target.value );
    displaysTodos();
    event.target.value = '';

  });

  todoListUl.addEventListener('click', (event) => {

    const elementHtml = event.target.closest('[data-id]');
    todoStore.toggleTodo( elementHtml.getAttribute('data-id') );
    displaysTodos();

  });

  todoListUl.addEventListener('click', (event) => {

    const isDestroyElement = event.target.className === 'destroy';
    const elementHtml = event.target.closest('[data-id]');

    if( !elementHtml || !isDestroyElement ) return;
    
    todoStore.deleteTodo( elementHtml.getAttribute('data-id') );
    displaysTodos();
   
  });

  ClearCompleted.addEventListener('click', () => {

    todoStore.deleteTodoCompleted();
    displaysTodos();
   
  });

  filterListItem.forEach( element => {
    
    element.addEventListener('click', (element) => {
      filterListItem.forEach( el => el.classList.remove('selected'));
      element.target.classList.add('selected');

      switch( element.target.text ){
        case 'Todos':
          todoStore.setFilterTodo( Filters.All )
        break;
        case 'Pendientes':
          todoStore.setFilterTodo( Filters.Pending )
        break;
        case 'Completados':
          todoStore.setFilterTodo( Filters.Completed )
        break;
      }

      displaysTodos();

    });

  });

}