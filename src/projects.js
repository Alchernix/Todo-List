import { dataObj } from "./storage";

class Project {
    static currentId = 0;

    constructor(title) {
        this.id = Project.currentId++;
        this.title = title;
        this.todos = [];
    }
}
// 로컬스토리지에서 특정 프로젝트를 불러오는 함수 -> 화면상에서 투두를 보여줄 때 사용
function loadProject(projectId) {
    return dataObj.projects.find((project) => project.id === projectId);
}

function addProject(title) {
    const newProject = new Project(title);
    dataObj.projects.push(newProject);
    dataObj.dataStore();
    return newProject.id;
}

function editProject(title, projectId) {
    const project = dataObj.projects.find((project) => project.id === projectId);
    project.title = title;
    dataObj.dataStore();
}

function deleteProject(projectId) {
    const projectIndex = dataObj.projects.findIndex((project) => project.id === projectId);
    dataObj.projects.splice(projectIndex, 1);
    dataObj.dataStore();
}

export { Project, loadProject, addProject, editProject, deleteProject };