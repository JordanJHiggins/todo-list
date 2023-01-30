import Project from './project';
import Task from './task';
import TodoList from './todoList';
import Ui from './UI';
import './style.css';

// Logic Testing

const project1 = new Project('projectOne');
const project2 = new Project('Work');

// app init / default
const todoListOne = new TodoList();

todoListOne.addProject(project1);
todoListOne.addProject(project2);

const task1 = new Task('taskOne', 'code a todo app', '06/12/2023', 'high');
const task2 = new Task('taskTwo', 'eat a tasty salad', '07/26/2024', 'low');

// const data = { title: 'bingbong', priority: 'extreme!!' };

project1.addTask(task1);
project1.addTask(task2);

console.log(project1);
console.log(todoListOne);

// UI Testing
const newUi = new Ui();

newUi.createDefaultPage();

// newUi.createProjectCard(project1.title);
// newUi.createProjectCard(project2.title);

// newUi.createTaskCard(task1);

// const myDate = document.getElementById('date');
// myDate.addEventListener('change', () => {
//   console.log(myDate.value);
// });
