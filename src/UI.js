import TodoList from './todoList';
import Task from './task';
import Project from './project';

export default class Ui {
  // Helper functions
  elementFromHtml(html) {
    const template = document.createElement('template');

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
  }

  // Create Elements
  projectCardTemplate(project) {
    const mainContent = document.getElementById('main-content');
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.id = project.title;

    const projectCardContent = this.elementFromHtml(`
    <div>
      <h2>${project.title}</h2>
      <button class="task-button" id="${projectCard.id}">Add task</button>
    </div>`);

    projectCard.appendChild(projectCardContent);
    mainContent.appendChild(projectCard);
    this.createTaskForm();
    this.initTaskButton();
  }

  taskCardTemplate(task, id) {
    const projectCard = document.getElementById(`${id}`);
    const taskCard = document.createElement('div');

    taskCard.innerHTML = `
    <div class="task-card"
      <h5>${task.title}</h5>
      <h5>${task.desc}</h5>
      <h5>${task.dueDate}</h5>
      <h5>${task.priority}</h5>
    <div/>
    `;

    projectCard.appendChild(taskCard);
  }

  createProjectForm() {
    const sideBar = document.getElementById('side-bar');
    sideBar.innerHTML = `<button class="project-button">Add Project</button>
    <dialog id="project-modal"> 
    <form method="dialog" id="project-form">
    <label for="title">Title</label><br>
    <input type="text" id="project-title"><br>
    <button class="project-submit" type="submit">Submit</button>
    </form>
    </dialog>`;
  }

  createTaskForm() {
    const gridWrapper = document.getElementById('grid-wrapper');
    const mainContent = document.getElementById('main-content');

    const formContent = this.elementFromHtml(`<dialog id="task-modal"> 
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
    </dialog>`);

    mainContent.appendChild(formContent);
    gridWrapper.appendChild(mainContent);
  }

  loadHome() {
    const newTodoList = new TodoList();
    const newInbox = new Project('Inbox');

    newTodoList.addProject(newInbox);
    this.createProjectForm();
    this.projectCardTemplate(newInbox);
    this.createNewProject(newTodoList);
    this.initProjectButton();
  }

  // Event Listeners
  initTaskButton() {
    const taskModal = document.querySelector('#task-modal');
    const taskButton = document.querySelectorAll('.task-button');
    const closeModal = document.querySelector('.close-modal');
    // separate opening modal to its own function?
    taskButton.forEach((button) =>
      button.addEventListener('click', (e) => {
        const buttonId = e.target.id;
        this.createNewTask(buttonId);
        taskModal.showModal();
      })
    );

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

  createNewProject(todoList) {
    const projectForm = document.getElementById('project-form');
    let newProject = new Project();

    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const projectTitle = document.getElementById('project-title').value;

      newProject = new Project(projectTitle);
      this.projectCardTemplate(newProject);

      todoList.addProject(newProject);
      console.log(todoList);
    });
  }

  createNewTask(id) {
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
      this.taskCardTemplate(newTask, id);
    });
  }
}
