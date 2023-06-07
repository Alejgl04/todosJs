import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases/render-todos';


const ElementIds = { 
  TodoList: '.todo-list',
  newTodoInput: '#new-todo-input'
}

/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

  const displaysTodos = () => {
    
    const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
    renderTodos( ElementIds.TodoList, todos )
    
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

}