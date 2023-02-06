export default class Project {
  constructor(title) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.tasks = [];
  }

  getTitle() {
    return this.title;
  }

  getTasksList() {
    return this.tasks;
  }

  getID() {
    return this.id;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    const index = this.tasks.indexOf(task);

    this.tasks.splice(index, 1);
  }

  updateTask(taskId, data) {
    Object.assign(
      this.tasks.find((obj) => obj.id === taskId),
      data
    );
  }
}
