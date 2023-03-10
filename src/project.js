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

  findTask(taskId) {
    const foundTask = this.tasks.find((obj) => obj.id === taskId);

    return foundTask;
  }

  updateTask(taskId, data) {
    Object.assign(
      this.tasks.find((obj) => obj.id === taskId),
      data
    );
  }
}
