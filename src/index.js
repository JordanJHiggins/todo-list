import Project from './project';
import Task from './task';

// Logic Testing
const project1 = new Project('projectOne');

const task1 = new Task('taskOne', 'code a todo app', '06/12/2023', 'high');
const task2 = new Task('taskTwo', 'eat a tasty salad', '07/26/2024', 'low');

const data = { title: 'bingbong', priority: 'extreme!!' };
project1.addTask(task1);
project1.addTask(task2);

project1.updateTask(task1.id, data);
project1.updateTask(task2.id, data);

console.log(project1);
