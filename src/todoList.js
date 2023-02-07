import Project from './project';

export default class TodoList {
  constructor() {
    this.title = 'Todo List';
    this.projects = [];
  }

  getTodoList() {
    return this.projects;
  }

  addProject(project) {
    this.projects.push(project);
  }

  removeProject(project) {
    const index = this.projects.indexOf(project);

    this.projects.splice(index, 1);
  }

  findProject(projectId) {
    const foundObject = this.projects.find((obj) => obj.id === projectId);
    console.log(foundObject);
    return foundObject;
  }

  updateProject(projectId, data) {
    Object.assign(
      this.projects.find((obj) => obj.id === projectId),
      data
    );
  }
}
