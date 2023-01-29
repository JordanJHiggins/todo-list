export default class TodoList {
  constructor() {
    this.title = 'Todo List';
    this.projects = [];
  }

  addProject(project) {
    this.projects.push(project);
  }

  removeProject(project) {
    const index = this.projects.indexOf(project);

    this.projects.splice(index, 1);
  }

  updateProject(projectId, data) {
    Object.assign(
      this.projectss.find((obj) => obj.id === projectId),
      data
    );
  }
}
