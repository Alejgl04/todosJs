import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases/render-todos';


const ElementIds = { 

  TodoList: '.todo-list',

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
}