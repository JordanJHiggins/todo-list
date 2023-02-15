import View from './View';
import TodoList from './todoList';
import Project from './project';
import Task from './task';
import { app } from './index';

export default class Controller {
  constructor(view, todoList) {
    this.view = view;
    this.todoList = todoList;
  }

  // Handler methods...
  handleAddProject = (projectTitle) => {
    const newProject = new Project(projectTitle);
    app.todoList.addProject(newProject);
    app.view.renderProjectView(newProject.title, newProject.id);
    app.view.initAddTaskButton();
    console.log(app.todoList);
  };

  handleAddTask = (projectID, title, desc, dueDate, priority) => {
    const newTask = new Task(title, desc, dueDate, priority);

    app.todoList.findProject(projectID);
    console.log(newTask);
  };

  // Rerender project view on selector click?
  handleChangeProjectTab = (project) => {
    console.log(project);
    app.view.renderProjectView(project);
  };
}
