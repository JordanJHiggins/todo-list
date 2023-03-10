import Project from './project';

export default class TodoList {
  constructor() {
    this.title = 'Todo List';
    this.projects = [];
    this.activeProject = '';
  }

  addProject(project) {
    this.projects.push(project);
  }

  removeProject(project) {
    const index = this.projects.indexOf(project);

    this.projects.splice(index, 1);
  }

  setActiveProject(project) {
    this.activeProject = project;
  }

  getActiveProject() {
    return this.activeProject;
  }

  findProject(projectTitle) {
    const foundObject = this.projects.find((obj) => obj.id === projectTitle);

    return foundObject;
  }

  updateProject(projectId, data) {
    Object.assign(
      this.projects.find((obj) => obj.id === projectId),
      data
    );
  }
}
