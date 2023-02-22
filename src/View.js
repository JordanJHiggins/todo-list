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

  toggleEditTaskInput() {
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

  clearTask(el) {
    if (el.classList.contains('delete-task')) {
      // Selects outer most parent of save button (task-card)
      el.parentElement.parentElement.parentElement.remove();
    }
    console.log('yo');
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

  // Form when editing a task
  renderEditTaskInput(task, taskTitle, taskDesc, taskDueDate, taskPriority) {
    const editTaskContainer = this.createElement('div', 'edit-task-container');
    editTaskContainer.id = task.id;
    editTaskContainer.style.display = 'none';
    editTaskContainer.innerHTML = `
    <form method="dialog" id=${task.id}>
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
    project.tasks.forEach((task) => {
      const taskCard = this.createTaskCard(task);
      taskContainer.append(taskCard);
    });
  }

  // Creates a new task card element with the given task data
  createTaskCard(task) {
    const taskCard = document.createElement('div', 'task-card');
    taskCard.id = task.id;

    const title = document.createElement('p', 'task-card-title ');
    title.textContent = task.title;
    taskCard.append(title);

    const deleteButton = document.createElement('button', 'delete-task-button');
    deleteButton.textContent = 'X';
    title.append(deleteButton);

    const desc = document.createElement('p', 'task-card-desc');
    desc.textContent = task.desc;
    taskCard.append(desc);

    const date = document.createElement('input', 'task-card-date');
    date.type = 'date';
    date.value = task.dueDate;
    taskCard.append(date);

    const priority = document.createElement('p', 'task-card-priority');
    priority.textContent = task.priority;
    taskCard.append(priority);

    const editButton = document.createElement('button', 'edit-task-button');
    editButton.textContent = 'Edit';
    taskCard.append(editButton);

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

  // ONE EVENT LISTENER FOR ALL INPUTS?
  editTaskTitle(currentProject) {
    // How to query save button just once?
    const saveButton = document.querySelector('.save-updates');
    const taskCardTitle = document.querySelector('.updated-task-title');

    // listen for click event on save button, pass taskCardTitle.value as updatedTitle
    saveButton.addEventListener('click', (e) => {
      const taskID = e.target.parentNode.id;
      const updatedTitle = taskCardTitle.value;
      // taskCardTitle.value?^^
      console.log(updatedTitle);
      app.handleEditTaskTitle(currentProject, taskID, updatedTitle);
      this.clearTasks();
    });
  }

  editDesc(currentProject) {
    const saveButton = document.querySelector('.save-updates');
    const taskCardDesc = document.querySelector('.updated-task-desc');

    taskCardDesc.addEventListener('focusout', (e) => {
      const taskID = e.target.parentNode.id;
      const updatedDesc = e.target.value;
      console.log(updatedDesc);
      app.handleEditDesc(currentProject, taskID, updatedDesc);
    });
  }

  editDueDate(currentProject) {
    const taskDueDate = document.querySelector('.updated-task-date');

    taskDueDate.addEventListener('change', (e) => {
      const taskID = e.target.parentNode.dataset.id;
      const updatedDueDate = e.target.value;
      app.handleEditDueDate(currentProject, taskID, updatedDueDate);
    });
  }

  editPriority(currentProject) {
    const taskPriority = document.querySelector('.updated-task-priority');

    taskPriority.addEventListener('input', (e) => {
      const taskID = e.target.parentNode.dataset.id;
      const updatedPriority = e.target.value;
      app.handleEditPriority(currentProject, taskID, updatedPriority);
    });
  }

  initEditTaskButton() {
    const editTaskButton = document.querySelector('.edit-task-button');

    // Need to loop over all edit buttons
    editTaskButton.addEventListener('click', this.toggleEditTaskInput);
  }

  // Gets called in controller, handleEditTask. currentProject passed there.
  initSaveButton(currentProject) {
    const saveButton = document.querySelector('.save-updates');
    saveButton.addEventListener('click', (e) => {
      e.target.classList.add('delete-task');

      this.clearTask(e.target);
      app.view.renderTasks(currentProject);
    });
  }
}
