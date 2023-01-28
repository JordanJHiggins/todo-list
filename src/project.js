export default class Project {
  constructor(title) {
    this.id = crypto.randomUUID();
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

  updateTask(task, newTitle) {
    const index = this.tasks.findIndex((obj) => obj.id === task.id);

    console.log(index);

    this.tasks[index].title = newTitle;
  }
}
