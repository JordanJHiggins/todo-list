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

    app.view.renderProjectTab(newProject.id, projectTitle);
    app.view.initProjectTabButton();
    // app.view.initDeleteProjectButton(newProject);
  };

  // Rerender project view on selector click?
  handleChangeProjectTab = (projectID) => {
    const tabbedProject = app.todoList.findProject(projectID);

    app.view.clearProjectView(app.view.mainContent);
    app.view.renderTabbedProjectView(tabbedProject.title, tabbedProject.id);
    app.view.renderTasks(tabbedProject);
    app.view.initAddTaskButton();
    // app.view.initEditTaskInput(tabbedProject);
    app.view.initDeleteTaskButton(tabbedProject);
    app.view.initDeleteProjectButton(tabbedProject.id);
    // app.view.initCancelEditButton();
  };

  handleAddTask = (projectID, title, desc, dueDate, priority) => {
    const newTask = new Task(title, desc, dueDate, priority);

    if (title != '') {
      const currentProject = app.todoList.findProject(projectID);
      currentProject.addTask(newTask);

      app.view.renderNewTask(newTask);
      app.view.initEditTaskInput(currentProject);
      app.view.initDeleteTaskButton(currentProject);
      app.view.initEditTaskButton();
      app.view.initCancelEditButton();
      app.view.initSaveButton(currentProject);
    } else {
      alert('Title can not be empty.');
    }
  };

  handleOpenEditTaskForm(currentTask) {
    // pass specific task to open edit input on
    console.log(`current Task: ${currentTask}`);
    app.view.toggleEditTaskInput(currentTask);
  }

  handleCloseEditTaskForm(currentTask) {
    app.view.toggleEditTaskInput(currentTask);
  }

  handleEditTask(currentProject, taskID, updatedValue, property) {
    if (property.classList.contains('updated-task-title')) {
      this.handleEditTaskTitle(currentProject, taskID, updatedValue);
    } else if (property.classList.contains('updated-task-desc')) {
      this.handleEditDesc(currentProject, taskID, updatedValue);
    } else if (property.classList.contains('updated-task-date')) {
      this.handleEditDueDate(currentProject, taskID, updatedValue);
    } else if (property.classList.contains('updated-task-priority')) {
      this.handleEditPriority(currentProject, taskID, updatedValue);
    }
  }

  handleEditTaskTitle = (currentProject, taskID, updatedValue) => {
    const currentTask = currentProject.findTask(taskID);

    currentProject.updateTask(currentTask.id, { title: updatedValue });

    app.view.initSaveButton(currentProject);
    console.log(currentTask);
  };

  handleEditDesc = (currentProject, taskID, updatedValue) => {
    const currentTask = currentProject.findTask(taskID);

    currentProject.updateTask(currentTask.id, {
      desc: updatedValue,
    });
    app.view.initSaveButton(currentProject);
  };

  handleEditDueDate = (currentProject, taskID, updatedValue) => {
    const currentTask = currentProject.findTask(taskID);

    currentProject.updateTask(currentTask.id, { dueDate: updatedValue });
  };

  handleEditPriority = (currentProject, taskID, updatedValue) => {
    const currentTask = currentProject.findTask(taskID);

    currentProject.updateTask(currentTask.id, { priority: updatedValue });
  };

  handleSaveTaskUpdates(currentProject, currentTask) {
    app.view.clearTask(currentTask);
    app.view.renderTasks(currentProject);
  }

  handleDeleteTask(deletedTask, taskId, currentProject) {
    const taskObj = currentProject.findTask(taskId);

    currentProject.removeTask(taskObj);
    app.view.deleteTaskCard();
  }

  handleDeleteProject(projectID) {
    const projectObj = this.todoList.findProject(projectID);

    this.todoList.removeProject(projectObj);
  }
}
