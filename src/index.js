import Project from './project';
import Task from './task';
import TodoList from './todoList';
import Ui from './UI';
import './style.css';

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  // data format for updating task.
  // const data = { title: 'bingbong', priority: 'extreme!!' };

  // UI Testing
  const newUi = new Ui();

  // load inbox
  newUi.loadHome();
});
