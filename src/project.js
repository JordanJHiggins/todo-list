export default class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    const index = this.tasks.indexOf(task);

    this.tasks.splice(index, 1);
  }
}
