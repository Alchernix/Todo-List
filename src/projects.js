import { addDays, isToday, isWithinInterval, startOfDay } from "date-fns";
import { dataObj } from "./storage";
import { displayProjectList } from "./DOM";

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
    updateTodayProject();
}

function deleteProject(projectId) {
    const projectIndex = dataObj.projects.findIndex((project) => project.id === projectId);
    dataObj.projects.splice(projectIndex, 1);
    dataObj.dataStore();
    updateTodayProject();
}

function updateTodayProject() {
    dataObj.projects[1].todos = [];
    dataObj.projects[2].todos = [];

    dataObj.projects.forEach((project) => {
        if (project.id !== 1 && project.id !== 2) { // 중복추가 방지
            project.todos.forEach((todo) => {
                const today = startOfDay(new Date());
                const nextWeek = addDays(today, 7);

                if (isToday(todo.dueDate)) {
                    dataObj.projects[1].todos.push(todo);
                }
                if (isWithinInterval(todo.dueDate, { start: today, end: nextWeek })) {
                    dataObj.projects[2].todos.push(todo);
                }
            })
        }
    })

    displayProjectList(); //투데이에 몇개 남았는데 업데이트
    dataObj.dataStore();
}

export { Project, loadProject, addProject, editProject, deleteProject, updateTodayProject };