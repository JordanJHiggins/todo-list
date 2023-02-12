import View from './View';
import TodoList from './todoList';
import Project from './project';
import Task from './task';

export default class Controller {
  constructor(view, todoList) {
    this.view = view;
    this.todoList = todoList;
  }

  // Handler methods...
  handleAddProject = (projectTitle) => {
    this.todoList.addProject(projectTitle);
    console.log(this.todoList);
  };
}
