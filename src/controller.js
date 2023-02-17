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
  };

  handleAddTask = (projectID, title, desc, dueDate, priority) => {
    const newTask = new Task(title, desc, dueDate, priority);

    const currentProject = app.todoList.findProject(projectID);

    currentProject.addTask(newTask);
    app.view.renderNewTask(newTask);
  };

  // Rerender project view on selector click?
  handleChangeProjectTab = (projectID) => {
    const tabbedProject = app.todoList.findProject(projectID);
    app.view.clearProjectView(app.view.mainContent);
    app.view.renderTabbedProjectView(tabbedProject.title, tabbedProject.id);
    app.view.renderTasks(tabbedProject);
  };
}
