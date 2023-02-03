import TodoList from './todoList';
import Task from './task';
import Project from './project';

export default class Ui {
  // Create Elements
  createProjectCard(projectArray) {
    projectArray.projects.forEach((proj) => {
      const mainContent = document.getElementById('main-content');
      const projectCard = document.createElement('div');
      projectCard.classList.add('project-card');
      projectCard.innerHTML = `<h2>${proj.title}</h2>
    `;

      mainContent.appendChild(projectCard);
    });
  }

  createTaskCard(task) {
    const projectCard = document.getElementsByClassName('project-card')[0];
    const taskCard = document.createElement('div');

    taskCard.innerHTML = `<h5>${task.title}</h5>
    <h5>${task.desc}</h5>
    <h5>${task.dueDate}</h5>
    <h5>${task.priority}</h5>
    `;

    projectCard.appendChild(taskCard);
  }

  createProjectForm() {
    const sideBar = document.getElementById('side-bar');
    sideBar.innerHTML = `<button class="project-button">Add Project</button>
    <dialog id="project-modal"> 
    <form method="dialog" id="task-form">
    <label for="title">Title</label><br>
    <input type="text" id="title-input"><br>
    <button class="project-submit" type="submit">Submit</button>
    </form>
    </dialog>`;
  }

  createTaskForm() {
    const gridWrapper = document.getElementById('grid-wrapper');
    const mainContent = document.createElement('div');
    mainContent.id = 'main-content';
    mainContent.innerHTML = `
    <button class="task-button">Add task </button>
    <dialog id="task-modal"> 
    <form method="dialog" id="task-form">
    <label for="title">Title</label><br>
    <input type="text" id="title-input"><br>
    <label for="desc">Description</label><br>
    <input type="text" id="desc-input"><br>
    <label for="due-date">Due Date</label><br>
    <input type="date id="date-input"><br>
    <label for="priority"> Priority</><br>
    <input type="text" id="priority-input"><br>
    <button class="close-modal">Close Modal</button>
    <button class="task-submit" type="submit">Submit</button>
    </form>
    </dialog> 
    `;
    gridWrapper.appendChild(mainContent);
  }

  loadHome() {
    const newTodoList = new TodoList();
    const newInbox = new Project('Inbox');
    const clean = new Project('Clean');
    newTodoList.addProject(newInbox);
    newTodoList.addProject(clean);
    this.createTaskForm();
    this.createProjectForm();
    this.createProjectCard(newTodoList);
  }

  // Event Listeners
  listenAddTask() {
    const taskForm = document.getElementById('task-form');
    // need to get values after submisson
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskTitle = document.getElementById('title-input').value;
      const taskDesc = document.getElementById('desc-input').value;
      const taskDueDate = document.getElementById('date-input').value;
      const taskPriority = document.getElementById('priority-input').value;
      this.createNewTask(taskTitle, taskDesc, taskDueDate, taskPriority);
    });

    this.createNewTask(taskTitle, taskDesc, taskDueDate, taskPriority);
  }

  initTaskButton() {
    const taskModal = document.querySelector('#task-modal');
    const taskButton = document.querySelector('.task-button');
    const closeModal = document.querySelector('.close-modal');
    // separate opening modal to its own function?
    taskButton.addEventListener('click', () => {
      taskModal.showModal();
    });

    closeModal.addEventListener('click', () => {
      taskModal.close();
    });
  }

  initProjectButton() {
    const projectModal = document.querySelector('#project-modal');
    const projectButton = document.querySelector('.project-button');
    const closeModal = document.querySelector('.close-modal');

    projectButton.addEventListener('click', () => {
      projectModal.showModal();
    });

    closeModal.addEventListener('click', () => {
      projectModal.close();
    });
  }
}
