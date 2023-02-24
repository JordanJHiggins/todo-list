import TodoList from './todoList';
import Task from './task';
import Project from './project';
import Controller from './controller';
import { app } from './index';
import { isThisQuarter } from 'date-fns';

export default class View {
  constructor() {
    // Root element, grid container
    this.root = this.getElement('#grid-wrapper');

    this.title = this.createElement('h1');
    this.title.textContent = 'todoooo';

    // Main content area, projects displayed here
    this.mainContent = this.createElement('div', 'main-content');

    // Side bar, project list displayed here
    this.sideBar = this.createElement('div', 'side-bar');

    this.addProjectModal = this.createElement('div', 'add-project-modal');
    this.addProjectModal.style.display = 'none';

    // Add project button and input, located in sidebar
    this.addProjectButton = this.createElement('button', 'add-project-button');
    this.addProjectButton.textContent = 'Add Project ';

    this.addProjectInput = this.createElement('input', 'add-project-input');

    this.projectSubmit = this.createElement('button', 'project-submit');
    this.projectSubmit.type = 'submit';
    this.projectSubmit.textContent = 'Add';

    // Append project input and buttons to sidebar
    this.addProjectModal.append(this.addProjectInput, this.projectSubmit);

    this.sideBar.append(this.addProjectButton, this.addProjectModal);
    // Append sidebar and main content to grid-wrapper
    this.root.append(this.sideBar, this.mainContent);
  }

  // Helpers --------------------------------------------
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  getProjectTitleValue() {
    return this.addProjectInput.value;
  }

  clearProjectInput() {
    this.addProjectInput = '';
  }

  //  Toggle a class of hide on these method with "classList.toggle()"?
  toggleProjectModal() {
    const addProjectModal = document.querySelector('.add-project-modal');

    if (addProjectModal.style.display === 'none') {
      addProjectModal.style.display = 'block';
    } else {
      addProjectModal.style.display = 'none';
    }
  }

  toggleTaskInput() {
    const addTaskContainer = document.querySelector('.add-task-container');

    if (addTaskContainer.style.display === 'none') {
      addTaskContainer.style.display = 'block';
    } else {
      addTaskContainer.style.display = 'none';
    }
  }

  toggleEditTaskInput(taskID) {
    const editTaskContainer = document.querySelector('.edit-task-container');

    if (editTaskContainer.style.display === 'none') {
      editTaskContainer.style.display = 'block';
    } else {
      editTaskContainer.style.display = 'none';
    }
  }

  closeAddProjectModal(modal) {
    modal.style.display = 'none';
  }

  // Takes an html element as parameter
  clearProjectView(content) {
    while (content.hasChildNodes()) {
      content.removeChild(content.firstChild);
    }
  }

  clearTaskList(el) {
    if (el.classList.contains('clear-task')) {
      // Selects outer most parent of save button (task-card)
      el.parentElement.parentElement.parentElement.remove();
    }
    console.log('yo');
  }

  deleteTaskCard() {
    document.querySelectorAll('.delete-task').forEach((task) => task.remove());
  }

  openDateInput(taskCard) {
    const datePicker = this.createElement('input', 'date-picker');
    datePicker.setAttribute('type', 'date');

    taskCard.append(datePicker);
  }

  // Form when adding a new task
  renderTaskInput(project) {
    const addTaskContainer = this.createElement('div', 'add-task-container');
    addTaskContainer.style.display = 'none';
    addTaskContainer.innerHTML = `<form method="dialog" id="task-form">
       <label for="title">Title</label><br>
       <input type="text" id="title-input"><br>
       <label for="desc">Description</label><br>
       <input type="text" id="desc-input"><br>
       <label for="due-date">Due Date</label><br>
       <input type="date" id="date-input"><br>
       <label for="priority"> Priority</><br>
       <input type="text" id="priority-input"><br>
       <button class="submit-task-button" type="submit">Submit</button>
      </form>`;

    project.append(addTaskContainer);
    this.initSubmitTaskButton();
  }

  createEditTaskForm() {}
  // Form when editing a task
  renderEditTaskInput(task, taskTitle, taskDesc, taskDueDate, taskPriority) {
    const editTaskContainer = this.createElement('div', 'edit-task-container');
    editTaskContainer.id = task.id;
    editTaskContainer.style.display = 'none';
    editTaskContainer.innerHTML = `
    <form method="dialog" class="edit-task-form" id=${task.id}>
       <label for="title">Title</label><br>
       <input type="text" class="updated-task-title" id="updated-title" value=${taskTitle}><br>
       <label for="desc">Description</label><br>
       <input type="text" class="updated-task-desc"id="desc-input" value=${taskDesc}><br>
       <label for="due-date">Due Date</label><br>
       <input type="date" id="date-input" value=${taskDueDate}><br>
       <label for="priority"> Priority</label><br>
       <input type="text" id="priority-input" value=${taskPriority}><br>
       <button class="save-updates" type="submit">save</button>
      </form>
    `;

    task.append(editTaskContainer);
  }

  // Talk to controller / pass data to handlers  ------------------------------
  submitNewProject() {
    const projectTitle = document.querySelector('.add-project-input').value;

    app.handleAddProject(projectTitle);
  }

  submitNewTask() {
    const taskTitle = document.getElementById('title-input');
    const taskDesc = document.getElementById('desc-input');
    const taskDueDate = document.getElementById('date-input');
    const taskPriority = document.getElementById('priority-input');
    const projectTitle = document.querySelector('.project-title');

    app.handleAddTask(
      projectTitle.id,
      taskTitle.value,
      taskDesc.value,
      taskDueDate.value,
      taskPriority.value
    );
  }

  submitUpdatedTask() {
    const updatedTitle = document.querySelector('.updated-task-title');

    app.handleEditTaskView(updatedTitle.value);
  }

  changeProjectTab(projectID) {
    app.handleChangeProjectTab(projectID);
  }

  // Render elements ---------------------------------------
  renderProjectView(title, projectID) {
    const projectView = this.createElement('div', 'project-view-container');

    const projectTitle = this.createElement('h2', 'project-title');
    projectTitle.textContent = title;
    projectTitle.id = projectID;

    const addTaskButton = this.createElement('button', 'add-task-button');
    addTaskButton.textContent = 'Add Task';

    projectView.append(projectTitle, addTaskButton);
    this.mainContent.append(projectView);

    this.initProjectTabButton();
  }

  renderTabbedProjectView(title, projectID) {
    const projectView = this.createElement('div', 'project-view-container');

    const projectTitle = this.createElement('h2', 'project-title');
    projectTitle.textContent = title;
    projectTitle.id = projectID;

    const addTaskButton = this.createElement('button', 'add-task-button');
    addTaskButton.textContent = 'Add Task';

    const taskContainer = this.createElement('div', 'task-container');
    taskContainer.id = projectID;

    projectView.append(projectTitle, addTaskButton);
    this.mainContent.append(projectView, taskContainer);

    this.renderTaskInput(projectView);
  }

  renderNewTask(task) {
    const taskCard = this.createTaskCard(task);
    document.querySelector('.task-container').append(taskCard);
  }

  // Renders all tasks in a project and appends them to the task container
  renderTasks(project) {
    const taskContainer = document.querySelector('.task-container');
    taskContainer.innerHTML = '';

    project.tasks.forEach((task) => {
      const taskCard = this.createTaskCard(task);
      taskContainer.append(taskCard);
    });
  }

  // Creates a new task card element with the given task data
  createTaskCard(task) {
    const taskCard = this.createElement('div', 'task-card');
    taskCard.id = task.id;

    const title = this.createElement('p', 'task-card-title');
    title.textContent = task.title;
    taskCard.append(title);

    const desc = this.createElement('p', 'task-card-desc');
    desc.textContent = task.desc;
    taskCard.append(desc);

    const date = this.createElement('input', 'task-card-date');
    date.type = 'date';
    date.value = task.dueDate;
    taskCard.append(date);

    const priority = this.createElement('p', 'task-card-priority');
    priority.textContent = task.priority;
    taskCard.append(priority);

    const editButton = this.createElement('button', 'edit-task-button');
    editButton.textContent = 'Edit';
    editButton.id = task.id;
    taskCard.append(editButton);

    const deleteButton = this.createElement('button', 'delete-task-button');
    deleteButton.textContent = 'X';
    taskCard.append(deleteButton);

    this.renderEditTaskInput(
      taskCard,
      task.title,
      task.desc,
      task.dueDate,
      task.priority
    );

    return taskCard;
  }

  renderProjectTab(projectID) {
    const projectTabButton = this.createElement('button', 'project-tab-button');
    projectTabButton.textContent = this.getProjectTitleValue();
    projectTabButton.id = projectID;

    this.sideBar.appendChild(projectTabButton);
  }

  // Event listeners -----------------------------------
  initAddProjectButton() {
    const addProjectButton = document.querySelector('.add-project-button');

    addProjectButton.addEventListener('click', this.toggleProjectModal);
  }

  initSubmitProjectButton() {
    const submitProjectButton = document.querySelector('.project-submit');

    submitProjectButton.addEventListener('click', (e) => {
      const projectModal = e.target.parentNode;
      this.submitNewProject();
      this.closeAddProjectModal(projectModal);
    });
  }

  initProjectTabButton() {
    const projectTabButtons = document.querySelectorAll('.project-tab-button');

    projectTabButtons.forEach((button) =>
      button.addEventListener('click', (e) => {
        console.log('roobus');
        const buttonID = e.target.id;
        this.changeProjectTab(buttonID);
      })
    );
  }

  // Shows task input in project
  initAddTaskButton(project) {
    const addTaskButton = document.querySelector('.add-task-button');

    addTaskButton.addEventListener('click', this.toggleTaskInput);
  }

  initSubmitTaskButton() {
    const submitTaskButton = document.querySelector('.submit-task-button');

    submitTaskButton.addEventListener('click', this.submitNewTask);
  }

  initEditTaskInput(currentProject) {
    const editTaskForm = document.querySelector('.edit-task-form');

    editTaskForm.addEventListener('input', (e) => {
      const taskID = e.target.parentNode.id;
      const updatedValue = e.target.value;
      const property = e.target;
      app.handleEditTask(currentProject, taskID, updatedValue, property);
    });
  }

  initEditTaskButton() {
    const editTaskButton = document.querySelectorAll('.edit-task-button');

    // Need to loop over all edit buttons
    editTaskButton.forEach((button) => {
      button.addEventListener('click', (e) => {
        const currentTask = e.target.id;
        const taskID = e.target.parentNode.id;

        if (currentTask === taskID) {
          console.log('bing');
          app.handleOpenEditTaskForm(currentTask, taskID);
        }
      });
    });
  }

  // Gets called in controller, handleEditTask. currentProject passed there.
  initSaveButton(currentProject) {
    const saveButton = document.querySelector('.save-updates');

    saveButton.addEventListener('click', (e) => {
      const currentTask = e.target;

      e.target.classList.add('clear-task');

      app.handleSaveTaskUpdates(currentProject, currentTask);
    });
  }

  initDeleteTaskButton(currentProject) {
    const deleteTaskButton = document.querySelectorAll('.delete-task-button');

    deleteTaskButton.forEach((button) => {
      button.addEventListener('click', (e) => {
        const taskID = e.target.parentNode.id;
        const deletedTask = document.getElementById(taskID);

        // Select taskCard without relying on dom structure?
        deletedTask.classList.add('delete-task');

        app.handleDeleteTask(deletedTask, taskID, currentProject);
      });
    });
  }
}
