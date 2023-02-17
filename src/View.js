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

  showAddProjectModal() {
    const addProjectModal = document.querySelector('.add-project-modal');
    if (addProjectModal.style.display === 'none') {
      addProjectModal.style.display = 'block';
    } else {
      addProjectModal.style.display = 'none';
    }
  }

  // add show and hide toggle
  showAddTaskInput(project) {
    const addTaskContainer = this.createElement('div', 'add-task-container');

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

  changeProjectTab(project) {
    app.handleChangeProjectTab(project);
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

    this.showAddTaskInput(projectView);
  }

  renderNewTask(task) {
    const newTaskCard = this.createElement('div', 'task-card');
    newTaskCard.innerHTML += `
    <p>${task.title}</p>
    <p>${task.desc}</p>
    <p>${task.dueDate}</p>
    <p>${task.priority}</p>
    `;

    this.mainContent.append(newTaskCard);
  }

  // Rebuilds task list on project tab switch
  renderTasks(project) {
    //How to check for duplicate task before rendering all tasks in projects array.
    project.tasks.forEach((task) => {
      const taskCard = this.createElement('div', 'task-card');

      taskCard.innerHTML = `
      <p>${task.title}</p>
      <p>${task.desc}</p>
      <p>${task.dueDate}</p>
      <p>${task.priority}</p>`;

      this.mainContent.append(taskCard);
    });
  }

  renderProjectTab() {
    const projectTabButton = this.createElement('button', 'project-tab-button');
    projectTabButton.textContent = this.getProjectTitleValue();
    // should call renderTask?
    this.sideBar.appendChild(projectTabButton);
  }

  // Event listeners -----------------------------------
  initAddProjectButton() {
    const addProjectButton = document.querySelector('.add-project-button');

    addProjectButton.addEventListener('click', this.showAddProjectModal);
  }

  initSubmitProjectButton() {
    const submitProjectButton = document.querySelector('.project-submit');

    submitProjectButton.addEventListener('click', () => {
      this.submitNewProject();
      this.renderProjectTab(this.getProjectTitleValue());
    });
  }

  initProjectTabButton() {
    const projectTabButtons = document.querySelector('.project-tab-button');

    projectTabButtons.addEventListener('click', (e) => {
      console.log('roobus');
      const buttonTitle = e.target.textContent;
      this.changeProjectTab(buttonTitle);
    });
  }

  initAddTaskButton(project) {
    const addTaskButton = document.querySelector('.add-task-button');

    addTaskButton.addEventListener('click', this.showAddTaskInput(project));
  }

  initSubmitTaskButton() {
    const submitTaskButton = document.querySelector('.submit-task-button');

    submitTaskButton.addEventListener('click', this.submitNewTask);
  }

  // OLD METHODS ---------------------------------------------------
  buildProject(project, todoList) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.id = `${project.getID()}`;

    projectCard.innerHTML = `
      <h2>${project.getTitle()}</h2>
     `;

    this.createProjectSelector(project, todoList);
    this.projectViewHandler(projectCard);
  }

  clearProjectView(content) {
    while (content.hasChildNodes()) {
      content.removeChild(content.firstChild);
    }
  }

  createNewProject(todoList) {
    const projectForm = document.getElementById('project-form');
    const projectTitle = document.getElementById('project-title');
    let newProject = new Project();

    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      newProject = new Project(projectTitle.value);

      todoList.addProject(newProject);
      const activeProj = todoList.getActiveProject();
      // Should be building the active project?
      this.buildProject(newProject, todoList);

      // this.createProjectSelector(newProject, todoList);
    });
  }

  projectViewHandler(projectCard) {
    const selectorButton = document.querySelectorAll('.selector');

    selectorButton.forEach((button) =>
      button.addEventListener('click', () => {
        const mainContent = document.getElementById('main-content');
        this.clearProjectView(mainContent);
        mainContent.appendChild(projectCard);
      })
    );
  }

  // Create task elements
  // createTaskForm() {
  //   const gridWrapper = document.getElementById('grid-wrapper');
  //   const mainContent = document.getElementById('main-content');

  //   mainContent.innerHTML = `
  //   <dialog id="task-modal">
  //   <form method="dialog" id="task-form">
  //   <label for="title">Title</label><br>
  //   <input type="text" id="title-input"><br>
  //   <label for="desc">Description</label><br>
  //   <input type="text" id="desc-input"><br>
  //   <label for="due-date">Due Date</label><br>
  //   <input type="date" id="date-input"><br>
  //   <label for="priority"> Priority</><br>9
  //   <input type="text" id="priority-input"><br>
  //   <button class="close-modal">Close Modal</button>
  //   <button class="task-submit" type="submit">Submit</button>
  //   </form>
  //   </dialog>
  //   <button class="task-button">Add Task</button>`;

  //   gridWrapper.appendChild(mainContent);
  // }

  initTaskButton() {
    const taskModal = document.querySelector('#task-modal');
    const taskButton = document.querySelector('.task-button');
    const closeModal = document.querySelector('.task-submit');

    taskButton.addEventListener('click', () => {
      taskModal.showModal();
    });

    closeModal.addEventListener('click', () => {
      taskModal.close();
    });
  }

  buildTaskCard(task, project) {
    const projectCard = document.querySelector('.active ');
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    taskCard.innerHTML = `
      <h5>${task.getTitle()}</h5>
      <h5>${task.getDesc()}</h5>
      <h5>${task.getDueDate()}</h5>
      <h5>${task.getPriority()}</h5>
      <button class="remove-button"  data-id="${task.getID()}">Remove</button>
  
    `;
    projectCard.appendChild(taskCard);
    this.removeTaskCard(task, project);
  }

  removeTaskCard(task, project) {
    const removeButton = document.querySelectorAll('.remove-button');

    removeButton.forEach((button) =>
      button.addEventListener('click', (e) => {
        const taskID = e.target.dataset.id;
        const foundTask = project.findTask(taskID);

        project.removeTask(foundTask);
        e.target.parentNode.remove();
      })
    );
  }

  createNewTask(todoList) {
    const taskForm = document.getElementById('task-form');
    let newTask = new Task();

    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const taskTitle = document.getElementById('title-input');
      const taskDesc = document.getElementById('desc-input');
      const taskDueDate = document.getElementById('date-input');
      const taskPriority = document.getElementById('priority-input');

      newTask = new Task(
        taskTitle.value,
        taskDesc.value,
        taskDueDate.value,
        taskPriority.value
      );

      const activeProj = todoList.getActiveProject();

      activeProj.addTask(newTask);
      this.buildTaskCard(newTask, activeProj);
    });
  }

  loadHome() {
    // Create main todolist, all proj stored here.
    const newTodoList = new TodoList();

    this.createProjectForm();
    this.initProjectButton();
    this.createNewProject(newTodoList);

    this.createTaskForm();
    this.initTaskButton();
    this.createNewTask(newTodoList);
  }

  // Sets ID of project on corresponding selector button, passes ID to findProject method.
  createProjectSelector(project, todoList) {
    const selectorContainer = document.querySelector('.project-selectors');
    selectorContainer.innerHTML += `<button class="selector" data-id="${project.getID()}">${project.getTitle()}</button>`;

    const selectorButton = document.querySelectorAll('.selector');
    selectorButton.forEach((button) =>
      button.addEventListener('click', (e) => {
        const buttonID = e.target.dataset.id;
        const foundProject = todoList.findProject(buttonID);

        todoList.setActiveProject(foundProject);
        this.removeProjectStatus();
        this.setProjectStatus(foundProject.id);
      })
    );
  }

  setProjectStatus(foundProject) {
    const activeProject = document.getElementById(`${foundProject}`);
    activeProject.classList.add('active');
  }

  removeProjectStatus() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectCardsArray = [...projectCards];

    projectCardsArray.forEach((projCard) =>
      projCard.classList.remove('active')
    );
  }
}
