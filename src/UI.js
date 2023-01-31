import TodoList from './todoList';

export default class Ui {
  // Create Elements
  createProjectCard(project) {
    const mainContent = document.getElementById('main-content');
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.innerHTML = `<h2>${project}</h2>
    `;

    mainContent.appendChild(projectCard);
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

  createDefaultPage() {
    const gridWrapper = document.getElementById('grid-wrapper');
    const mainContent = document.createElement('div');
    mainContent.id = 'main-content';
    mainContent.innerHTML = `<h2 id="inbox-title">Inbox</h2>
    <button class="task-button">Add task </button>
    <dialog class="modal"> 
    <form>
    <label for="title">Title</label><br>
    <input type="text" id="title-input"><br>
    <label for="desc">Description</label><br>
    <input type="text" id="desc-input"><br>
    <label for="due-date">Due Date</label><br>
    <input type="date id="date-input"><br>
    <label for="priority"> Priority</><br>
    <input type="radio" id="priority-input"><br>
    <button class="close-modal">Close Modal</button>
    </form>
    </dialog> 
    `;

    gridWrapper.appendChild(mainContent);
  }

  // Event Listeners
  initTaskButton() {
    const modal = document.querySelector('.modal');
    const taskButton = document.querySelector('.task-button');
    const closeModal = document.querySelector('.close-modal');
    // separate opening modal to its own function?
    taskButton.addEventListener('click', () => {
      console.log('issamodal');
      modal.showModal();
    });

    closeModal.addEventListener('click', () => {
      modal.close();
    });
  }
}
