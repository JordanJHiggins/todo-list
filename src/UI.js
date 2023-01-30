import TodoList from './todoList';

export default class Ui {
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
    <button class="task-button">Add task </button>`;

    gridWrapper.appendChild(mainContent);
  }
}
