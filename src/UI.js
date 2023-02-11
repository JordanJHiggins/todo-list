import TodoList from './todoList';
import Task from './task';
import Project from './project';

export default class Ui {
  createProjectForm() {
    const sideBar = document.getElementById('side-bar');
    sideBar.innerHTML = `
    <button class="project-button">Add Project</button>
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
