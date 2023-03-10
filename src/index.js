import Project from './project';
import Task from './task';
import TodoList from './todoList';
import View from './View';
import Controller from './controller';
import './style.css';

export const app = new Controller(new View(), new TodoList());

window.addEventListener('DOMContentLoaded', (event) => {
  // App is instance of Controller, takes in view and models
  app.view.initAddProjectButton();
  app.view.initSubmitProjectButton();
  app.view.initCancelProjectInput();
});
