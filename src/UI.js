import TodoList from './todoList';
import Task from './task';
import Project from './project';

export default class Ui {
  // Create Project Elements
  createProjectForm() {
    const sideBar = document.getElementById('side-bar');
    sideBar.innerHTML = `<button class="project-button">Add Project</button>
    <dialog id="project-modal"> 
    <form method="dialog" id="project-form">
    <label for="title">Title</label><br>
    <input type="text" id="project-title"><br>
    <button class="project-submit" type="submit">Submit</button>
    </form>
    </dialog>
    <div class="project-selectors"></div>`;
  }

  initProjectButton() {
    const projectModal = document.querySelector('#project-modal');
    const projectButton = document.querySelector('.project-button');
    const closeModal = document.querySelector('.project-submit');

    projectButton.addEventListener('click', () => {
      projectModal.showModal();
    });

    closeModal.addEventListener('click', () => {
      projectModal.close();
    });
  }

  buildProject(project) {
    const mainContent = document.getElementById('main-content');
    const projectCard = document.createElement('div');
    const projectCardContent = document.createElement('div');

    projectCardContent.innerHTML = `
    <div class="project-card" id="${project.getID()}">
      <h2>${project.getTitle()}</h2>
    </div>`;

    projectCard.appendChild(projectCardContent);
    mainContent.appendChild(projectCard);
  }

  createNewProject(todoList) {
    const projectForm = document.getElementById('project-form');
    const projectTitle = document.getElementById('project-title');
    let newProject = new Project();

    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      newProject = new Project(projectTitle.value);

      todoList.addProject(newProject);
      this.buildProject(newProject);
      this.createProjectSelector(newProject, todoList);
      console.log(todoList);
    });
  }

  // Create task elements
  createTaskForm() {
    const gridWrapper = document.getElementById('grid-wrapper');
    const mainContent = document.getElementById('main-content');

    mainContent.innerHTML = `
    <dialog id="task-modal">
    <form method="dialog" id="task-form">
    <label for="title">Title</label><br>
    <input type="text" id="title-input"><br>
    <label for="desc">Description</label><br>
    <input type="text" id="desc-input"><br>
    <label for="due-date">Due Date</label><br>
    <input type="date" id="date-input"><br>
    <label for="priority"> Priority</><br>
    <input type="text" id="priority-input"><br>
    <button class="close-modal">Close Modal</button>
    <button class="task-submit" type="submit">Submit</button>
    </form>
    </dialog>
    <button class="task-button">Add Task</button>`;

    gridWrapper.appendChild(mainContent);
  }

  initTaskButton() {
    const taskModal = document.querySelector('#task-modal');
    const taskButton = document.querySelector('.task-button');
    const closeModal = document.querySelector('.task-submit');
    // separate opening modal to its own function?
    taskButton.addEventListener('click', () => {
      taskModal.showModal();
    });

    closeModal.addEventListener('click', () => {
      taskModal.close();
    });
  }

  buildTaskCard(task) {
    const projectCard = document.querySelector('.active ');
    const taskCard = document.createElement('div');

    taskCard.innerHTML = `
    <div class="task-card">
      <h5>${task.getTitle()}</h5>
      <h5>${task.getDesc()}</h5>
      <h5>${task.getDueDate()}</h5>
      <h5>${task.getPriority()}</h5>
    <div/>
    `;
    projectCard.appendChild(taskCard);
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
      // console.log(activeProj);

      activeProj.addTask(newTask);
      // this.checkForActiveProject();
      this.buildTaskCard(newTask, todoList);
    });
  }

  loadHome() {
    const newTodoList = new TodoList();
    const newInbox = new Project('Inbox');

    newTodoList.addProject(newInbox);
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
        this.removeProjectStatus();
        console.log(foundProject);

        todoList.setActiveProject(foundProject);
        console.log(todoList);
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
