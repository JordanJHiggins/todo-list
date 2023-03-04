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

    this.header = this.createElement('div', 'main-header');
    this.title = this.createElement('h1');
    this.title.textContent = 'todoooo';

    // Main content area, projects displayed here
    this.mainContent = this.createElement('div', 'main-content');

    // Side bar, project list displayed here
    this.sideBar = this.createElement('div', 'side-bar');

    this.projectList = this.createElement('div', 'project-list');
    this.projectList.textContent = 'Projects ';

    this.addProjectTitle = this.createElement('h4', 'add-project-title');
    this.addProjectTitle.textContent = 'Project Name';

    this.addProjectModal = this.createElement('div', 'add-project-modal');
    this.addProjectModal.style.display = 'none';

    // Add project button and input, located in sidebar
    this.addProjectContainer = this.createElement(
      'div',
      'add-project-container'
    );

    this.addProjectButton = this.createElement('button', 'add-project-button');
    this.addProjectButton.textContent = 'Add Project ';

    this.addProjectInput = this.createElement('input', 'add-project-input');

    this.projectInputButtons = this.createElement(
      'div',
      'project-input-buttons'
    );

    this.projectSubmit = this.createElement('button', 'project-submit');
    this.projectSubmit.type = 'submit';
    this.projectSubmit.textContent = 'Add';

    this.cancelProjectInput = this.createElement(
      'button',
      'cancel-project-input'
    );
    this.cancelProjectInput.textContent = 'Cancel';

    this.projectInputButtons.append(
      this.projectSubmit,
      this.cancelProjectInput
    );
    // Append project input and buttons to sidebar
    this.addProjectModal.append(
      this.addProjectTitle,
      this.addProjectInput,
      this.projectInputButtons
    );

    this.addProjectContainer.append(this.addProjectButton);

    this.sideBar.append(
      this.addProjectContainer,
      this.addProjectModal,
      this.projectList
    );
    // Append sidebar and main content to grid-wrapper
    this.root.append(this.header, this.sideBar, this.mainContent);
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
      addProjectModal.style.display = 'flex';
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

  toggleEditTaskInput(task) {
    const editTaskContainer = task.querySelector('.edit-task-container');

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

  // Should be named deleteTask.
  clearTask(el) {
    if (el.classList.contains('clear-task')) {
      // Selects outer most parent of save button (task-card)
      el.parentElement.parentElement.parentElement.remove();
    }
  }

  clearTaskList() {
    const tasks = document.querySelectorAll('.task-card');

    tasks.forEach((task) => task.remove());
  }

  deleteTaskCard() {
    document.querySelectorAll('.delete-task').forEach((task) => task.remove());
  }

  deleteProjectSelector(deletedProject) {
    const projectSelector = document.getElementById(deletedProject);

    if (projectSelector.classList.contains('project-tab-button')) {
      projectSelector.remove();
    }
  }

  // Removes a project-view from dom
  deleteProjectCard(currentProject) {
    console.log(currentProject);
    const deletedProjectCard = document.getElementById(currentProject);

    deletedProjectCard.parentNode.remove();
  }

  openDateInput(taskCard) {
    const datePicker = this.createElement('input', 'date-picker');
    datePicker.setAttribute('type', 'date');

    taskCard.append(datePicker);
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
    this.initDeleteProjectButton(projectID);
  }

  renderTabbedProjectView(title, projectID) {
    const projectView = this.createElement('div', 'project-view-container');
    projectView.id = projectID;

    const projectTitle = this.createElement('h2', 'project-title');
    projectTitle.textContent = title;
    projectTitle.id = projectID;

    const addTaskButton = this.createElement('button', 'add-task-button');
    addTaskButton.textContent = 'Add Task';

    const deleteProjectButton = this.createElement(
      'button',
      'delete-project-button'
    );
    deleteProjectButton.textContent = 'Delete Project';

    const taskContainer = this.createElement('div', 'task-container');
    taskContainer.id = projectID;

    projectView.append(projectTitle, addTaskButton, deleteProjectButton);
    this.mainContent.append(projectView, taskContainer);

    this.renderTaskInput(projectView);
    this.initDeleteProjectButton(projectID);
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
      // Create a method that calls and returns these methods?
      // this.initEditTaskButton();
      this.initEditTaskInput(project);
      this.initDeleteTaskButton(project);
      this.initCancelEditButton();
      this.initSaveButton();
      this.initEditTaskButton();
    });
  }

  // Creates a new task card element with the given task dataa
  createTaskCard(task) {
    const taskCard = this.createElement('div', 'task-card');
    taskCard.id = task.id;

    const title = this.createElement('p', 'task-card-title');
    title.textContent = task.title;
    // taskCard.append(title);

    const desc = this.createElement('p', 'task-card-desc');
    desc.textContent = task.desc;
    // taskCard.append(desc);

    const date = this.createElement('p', 'task-card-date');
    // taskCard.append(date);

    const dateString = new Date(task.dueDate);
    date.append(dateString.toLocaleDateString('en-US'));

    const priority = this.createElement('p', 'task-card-priority');
    priority.textContent = task.priority;
    // taskCard.append(priority);

    const deleteButton = this.createElement('button', 'delete-task-button');
    deleteButton.textContent = 'X';
    // taskCard.append(deleteButton);

    const editButton = this.createElement('button', 'edit-task-button');
    editButton.textContent = 'Edit';
    editButton.id = task.id;
    // taskCard.append(editButton);

    const taskCardButtons = this.createElement('div', 'task-card-buttons');
    taskCardButtons.append(editButton, deleteButton);

    taskCard.append(title, desc, date, priority, taskCardButtons);
    this.initEditTaskButton();
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
    const projectTabContainer = this.createElement(
      'div',
      'project-tab-container'
    );

    const projectTabButton = this.createElement('button', 'project-tab-button');
    projectTabButton.textContent = this.getProjectTitleValue();
    projectTabButton.id = projectID;

    projectTabContainer.append(projectTabButton);
    this.projectList.appendChild(projectTabContainer);
  }

  // Form when adding a new task
  renderTaskInput(project) {
    const addTaskContainer = this.createElement('div', 'add-task-container');
    addTaskContainer.style.display = 'none';
    addTaskContainer.innerHTML = `
    <form id='task-form'>
    <div class="title-container">
       <label for='title'>Title</label><br>
       <input type='text' id='title-input'><br>
    </div>
    <div class="desc-container">
       <label for="desc">Description</label><br>
       <input type='text' id='desc-input'><br>
    </div>
    <div class="date-container">
       <label for='due-date'>Due Date</label><br>
       <input type='date' id='date-input'><br>
    </div>
    <div class="priority-container">
       <label for='priority'> Priority</><br>
       <select name="priority" id='priority-input'>
       <option value="low">Low</option> 
       <option value="medium">Medium</option> 
       <option value="high">High</option>
       <option value="Urgent">Urgent</option> 
       </select>
    </div>
       <button class='submit-task-button' type='submit'>Submit</button>
      </form>`;

    project.append(addTaskContainer);
    this.initSubmitTaskButton();
    // this.initSaveButton(project);
  }
  // Form when editing a task
  renderEditTaskInput(task, taskTitle, taskDesc, taskDueDate, taskPriority) {
    const editTaskContainer = this.createElement('div', 'edit-task-container');
    editTaskContainer.id = task.id;
    editTaskContainer.style.display = 'none';
    editTaskContainer.innerHTML = `
    <form class='edit-task-form' id='${task.id}'>
       <label for='title'>Title</label><br>
       <input type='text' class='updated-task-title' id="updated-title" value=${taskTitle}><br>
       <label for='desc'>Description</label><br>
       <input type='text' class='updated-task-desc' value='${taskDesc}'><br>
       <label for='due-date'>Due Date</label><br>
       <input type='date' class="updated-task-date" value='${taskDueDate}'><br>
       <label for='priority'> Priority</label><br>
       <select name="priority" class='updated-task-priority'>
       <option value="low">Low</option> 
       <option value="medium">Medium</option> 
       <option value="high">High</option>
       <option value="Urgent">Urgent</option> 
       </select>
       <button type="button" class='save-updates'>save</button>
      <button type="button" class='cancel-edit-button'>Cancel</button>
      </form>
    `;
    task.append(editTaskContainer);
  }

  // Event listeners -----------------------------------
  // Refactor: Listeners should be using event delegation rather than querying individual elements.
  initAddProjectButton() {
    const addProjectButton = document.querySelector('.add-project-button');

    addProjectButton.addEventListener('click', this.toggleProjectModal);
  }

  initSubmitProjectButton() {
    const submitProjectButton = document.querySelector('.project-submit');

    submitProjectButton.addEventListener('click', (e) => {
      const projectModal = e.target.parentNode.parentNode;
      this.submitNewProject();
      this.closeAddProjectModal(projectModal);
    });
  }

  initProjectTabButton() {
    const projectTabButtons = document.querySelectorAll('.project-tab-button');

    projectTabButtons.forEach((button) =>
      button.addEventListener('click', (e) => {
        const buttonID = e.target.id;
        console.log(buttonID);
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

    submitTaskButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.submitNewTask();
      this.toggleTaskInput();
    });
  }

  initEditTaskInput(currentProject) {
    const editTaskForm = document.querySelectorAll('.edit-task-form');

    editTaskForm.forEach((form) =>
      form.addEventListener('input', (e) => {
        const taskID = e.target.parentNode.id;
        const updatedValue = e.target.value;
        const property = e.target;

        this.initSaveButton(currentProject);
        this.initEditTaskInput(currentProject);
        app.handleEditTask(currentProject, taskID, updatedValue, property);
      })
    );
  }

  initEditTaskButton() {
    const taskCards = document.querySelectorAll('.task-card');

    taskCards.forEach((taskcard) =>
      taskcard.addEventListener('click', (e) => {
        console.log('click');
        console.log(e.target);
        if (e.target.classList.contains('edit-task-button')) {
          const taskID = e.target.parentNode.parentNode.id;
          const currentTask = document.getElementById(taskID);

          app.handleOpenEditTaskForm(currentTask);
        }
      })
    );
  }

  initCancelEditButton() {
    const cancelEditTask = document.querySelectorAll('.cancel-edit-button');

    cancelEditTask.forEach((button) =>
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const taskID = e.target.parentNode.parentNode.id;
        const currentTask = document.getElementById(taskID);
        console.log(currentTask);
        app.handleCloseEditTaskForm(currentTask);
      })
    );
  }

  // Gets called in controller, handleEditTask. currentProject passed there.
  initSaveButton(currentProject) {
    const saveButton = document.querySelectorAll('.save-updates');

    saveButton.forEach((button) =>
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTask = e.target;

        e.target.classList.add('clear-task');

        app.handleSaveTaskUpdates(currentProject, currentTask);
      })
    );
  }

  initDeleteTaskButton(currentProject) {
    const deleteTaskButton = document.querySelectorAll('.delete-task-button');

    deleteTaskButton.forEach((button) => {
      button.addEventListener('click', (e) => {
        const taskID = e.target.parentNode.parentNode.id;
        const deletedTask = document.getElementById(taskID);

        // Select taskCard without relying on dom structure?
        deletedTask.classList.add('delete-task');

        app.handleDeleteTask(deletedTask, taskID, currentProject);
      });
    });
  }

  initDeleteProjectButton(projectID) {
    const projectContainer = document.querySelector('.project-view-container');

    projectContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-project-button')) {
        const deletedProject = e.target.parentNode;
        deletedProject.remove();
        this.clearTaskList();

        this.deleteProjectSelector(deletedProject.id);
        // app.handleDeleteProject(projectID);
      }
    });
  }

  initCancelProjectInput() {
    const cancelProjectInputButton = document.querySelector(
      '.cancel-project-input'
    );

    cancelProjectInputButton.addEventListener('click', () => {
      console.log('bing');
      this.toggleProjectModal();
      this.clearProjectInput();
    });
  }
}
