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

    console.log(newProject);
    // app.view.renderProjectView(newProject.title, newProject.id);

    app.view.renderProjectTab(newProject.id, projectTitle);
    app.view.initProjectTabButton();
    // app.view.initAddTaskButton();
  };

  // Rerender project view on selector click?
  handleChangeProjectTab = (projectID) => {
    const tabbedProject = app.todoList.findProject(projectID);

    app.view.clearProjectView(app.view.mainContent);
    app.view.renderTabbedProjectView(tabbedProject.title, tabbedProject.id);
    app.view.renderTasks(tabbedProject);
    app.view.initAddTaskButton();

    app.view.editTaskTitle(tabbedProject);
    app.view.editDesc(tabbedProject);
    app.view.editDueDate(tabbedProject);
  };

  handleAddTask = (projectID, title, desc, dueDate, priority) => {
    const newTask = new Task(title, desc, dueDate, priority);

    const currentProject = app.todoList.findProject(projectID);

    currentProject.addTask(newTask);
    app.view.renderNewTask(newTask);

    app.view.editTaskTitle(currentProject);
    app.view.editDesc(currentProject);
    app.view.editDueDate(currentProject);
  };

  handleEditTaskTitle = (currentProject, taskID, data) => {
    const currentTask = currentProject.findTask(taskID);

    currentProject.updateTask(currentTask.id, { title: data });

    console.log(currentTask);
  };

  handleEditDesc = (currentProject, taskID, data) => {
    const currentTask = currentProject.findTask(taskID);

    currentProject.updateTask(currentTask.id, { desc: data });

    console.log(currentTask);
  };

  handleEditDueDate = (currentProject, taskID, data) => {
    const currentTask = currentProject.findTask(taskID);

    currentProject.updateTask(currentTask.id, { dueDate: data });

    console.log(currentTask);
  };

  handleEditPriority = (currentProject, taskID, data) => {
    const currentTask = currentProject.findTask(taskID);

    currentProject.updateTask(currentTask.id, { priority: data });

    console.log(currentTask);
  };
}
