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
    const projectCard = document.querySelector('.projectCard');
    const taskCard = document.createElement('div');

    taskCard.innerHTML = `<h5>${task}</h5>
    <h5>${task}</h5>
    <h5>${task}</h5>
    <h5>${task}</h5>
    `;

    projectCard.appendChild(taskCard);
  }
}
