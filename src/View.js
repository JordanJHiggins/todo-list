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

  closeAddProjectModal(modal) {
    modal.style.display = 'none';
  }

  clearProjectView(content) {
    while (content.hasChildNodes()) {
      content.removeChild(content.firstChild);
    }
  }

  openDateInput(taskCard) {
    const datePicker = this.createElement('input', 'date-picker');
    datePicker.setAttribute('type', 'date');

    taskCard.append(datePicker);
  }

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

  renderEditTaskInput(task) {
    const editTaskForm = this.createElement('div', 'edit-task-form');

    editTaskForm.innerHTML = `
    <form method="dialog" id="edit-task-form">
       <label for="title">Title</label><br>
       <input type="text" id="updated-title" value=${task.title}><br>
       <label for="desc">Description</label><br>
       <input type="text" id="desc-input"><br>
       <label for="due-date">Due Date</label><br>
       <input type="date" id="date-input"><br>
       <label for="priority"> Priority</><br>
       <input type="text" id="priority-input"><br>
       <button class="submit-task-button" type="submit">Submit</button>
      </form>
    `;
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

    // this.showAddTaskInput(projectView);
    // this.renderProjectTab(projectTitle.id);
    this.initProjectTabButton();
  }

  renderTabbedProjectView(title, projectID) {
    const projectView = this.createElement('div', 'project-view-container');

    const projectTitle = this.createElement('h2', 'project-title');
    projectTitle.textContent = title;
    projectTitle.id = projectID;

    const addTaskButton = this.createElement('button', 'add-task-button');
    addTaskButton.textContent = 'Add Task';

    projectView.append(projectTitle, addTaskButton);
    this.mainContent.append(projectView);

    this.renderTaskInput(projectView);
  }

  renderNewTask(task) {
    const newTaskCard = this.createElement('div', 'task-card');
    newTaskCard.id = task.id;
    newTaskCard.innerHTML += `
    <p class='task-card-title'>${task.title}<button class="delete-task-button">X</button></p>
    <p class='task-card-desc'>${task.desc}</p>
    <input class='task-card-date' type='date' value='${task.dueDate}'></p>
    <p class="task-card-priority" >${task.priority}</p>
    <button class="edit-task-button">Edit</button>
    `;

    this.mainContent.append(newTaskCard);
  }

  // Rebuilds task list on project tab switch
  renderTasks(project) {
    //How to check for duplicate task before rendering all tasks in projects array.
    project.tasks.forEach((task) => {
      const taskCard = this.createElement('div', 'task-card');
      taskCard.id = task.id;
      taskCard.innerHTML = `
      <p class='task-card-title'>${task.title}</p>
      <p class='task-card-desc'>${task.desc}</p>
      <input class='task-card-date' type='date' value='${task.dueDate}'></input>
      <p class="task-card-priority">${task.priority}</p>
      <button class="edit-task-button">Edit</button>
      `;

      this.mainContent.append(taskCard);
    });
  }

  renderTaskEditView() {
    const taskCard = document.querySelector('.task-card');

    const editTaskView = this.createElement('div');
    editTaskView.id = 'modal';
    editTaskView.innerHTML = ` <button data-modal-target="#modal">Edit</button>
    <div class= "modal" id="modal">
    <p class='task-card-title' contenteditable='true'>${task.title}<button class="delete-task-button">X</button></p>
    <p class='task-card-desc' contenteditable='true'>${task.desc}</p>
    <input class='task-card-date' type='date' value='${task.dueDate}'></p>
    <p class="task-card-priority" contenteditable="true">${task.priority}</p>
    </div>
    <div id="overlay"></div>`;

    this.taskCardContainer.appendChild(editTaskView);
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

  editTaskTitle(currentProject) {
    const taskCardTitle = document.querySelector('.updated-task-title');

    taskCardTitle.addEventListener('input', (e) => {
      const taskID = e.target.parentNode.dataset.id;
      const updatedTitle = e.target.innerText;
      app.handleEditTaskTitle(currentProject, taskID, updatedTitle);
    });
  }

  editDesc(currentProject) {
    const taskCardDesc = document.querySelector('.updated-task-desc');

    taskCardDesc.addEventListener('input', (e) => {
      const taskID = e.target.parentNode.dataset.id;
      const updatedDesc = e.target.innerText;
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

  // initOpenModalButton() {
  //   const openModalButton = document.querySelectorAll('[data-modal-target]');

  //   openModalButton.forEach((button) => {
  //     button.addEventListener('click', () => {
  //       console.log('roobussss');
  //       const modal = document.querySelector(button.dataset.modalTarget);
  //       this.openEditModal(modal);
  //     });
  //   });
  // }

  // initCloseModalButton() {
  //   const overlay = document.getElementById('overlay');

  //   overlay.addEventListener('click', (modal) => {
  //     const openModals = document.querySelectorAll('.modal.active');

  //     openModals.forEach((modal) => {
  //       this.closeModal(modal);
  //     });
  //   });
  // }

  initSaveButton() {
    const saveButton = document.querySelector('.save-button');
    const taskId = saveButton.dataset.id;
    saveButton.addEventListener('click');
  }

  // // Edit task modal
  // openEditModal(modal) {
  //   if (modal == null) return;

  //   modal.classList.add('active');
  //   overlay.classList.add('active');
  // }

  // closeModal(modal) {
  //   if (modal == null) return;

  //   modal.classList.remove('active');
  //   overlay.classList.remove('active');
  //   // call app.handleEditTaskView()?
  // }
}
