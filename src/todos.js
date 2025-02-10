import { dataObj } from "./storage";
import { updateTodayProject } from "./projects";
import { parseISO } from "date-fns";

class Todo {
    constructor(title, description, dueDate, priority, projectId) {
        this.id = dataObj.currentTodoId++;
        this.title = title;
        this.description = description;
        this.dueDate = parseISO(dueDate);
        this.priority = priority;
        this.isDone = false;
        this.projectId = projectId; //원출처 -> today, this week에서 원 프로젝트 식별시 사용
    }
}

//로컬스토리지에서 특정 투두를 불러오는 함수
function searchTodoById(todoId) {
    let result = null;
    dataObj.projects.forEach((project) => {
        if (project.id !== 1 && project.id !== 2) {
            project.todos.forEach((todo) => {
                if (todo.id === todoId) {
                    result = todo;
                }
            });
        }
    })
    return result;
}

function addTodo(title, description, dueDate, priority, projectId) {
    const todo = new Todo(title, description, dueDate, priority, projectId);
    const project = dataObj.projects.find((project) => project.id === projectId);
    project.todos.push(todo);
    dataObj.dataStore();
    updateTodayProject();
}

function editTodo(title, description, dueDate, priority, currentProjectId, newProjectId, todoId) {
    // currentProjectId = 현재 투두가 위치한 화면상의 프로젝트
    let project = dataObj.projects.find((project) => project.id === currentProjectId);
    let todoIndex = project.todos.findIndex((todo) => todo.id === todoId);
    const originalProjectId = project.todos[todoIndex].projectId;

    if (currentProjectId === 1 || currentProjectId === 2) {
        // Today 프로젝트의 투두를 수정한 경우 원본 프로젝트를 대신 수정 -> updateTodayProject로 업데이트
        project = dataObj.projects.find((project) => project.id === originalProjectId);
        todoIndex = project.todos.findIndex((todo) => todo.id === todoId);
    }
    project.todos[todoIndex].title = title;
    project.todos[todoIndex].description = description;
    project.todos[todoIndex].dueDate = dueDate || project.todos[todoIndex].dueDate; // 선택 안하면 이전값 그대로
    project.todos[todoIndex].priority = priority;
    project.todos[todoIndex].projectId = newProjectId;

    if (originalProjectId !== newProjectId) {
        const todo = project.todos.splice(todoIndex, 1)[0];
        const newProject = dataObj.projects.find((project) => project.id === newProjectId);
        newProject.todos.push(todo);
    }

    dataObj.dataStore();
    updateTodayProject();
}

function deleteTodo(projectId, todoId) {
    let project = dataObj.projects.find((project) => project.id === projectId);
    let todoIndex = project.todos.findIndex((todo) => todo.id === todoId);
    const originalProjectId = project.todos[todoIndex].projectId;

    if (projectId === 1 || projectId === 2) {
        // Today 프로젝트의 투두를 삭제한 경우 원본 프로젝트를 대신 삭제 -> updateTodayProject로 업데이트
        project = dataObj.projects.find((project) => project.id === originalProjectId);
        todoIndex = project.todos.findIndex((todo) => todo.id === todoId);
    }

    project.todos.splice(todoIndex, 1);
    dataObj.dataStore();
    updateTodayProject();
}

function toggleDone(projectId, todoId) {
    const project = dataObj.projects.find((project) => project.id === projectId);
    const todo = project.todos.find((todo) => todo.id === todoId);
    todo.isDone = !todo.isDone;
    dataObj.dataStore();
    updateTodayProject();
}

export { searchTodoById, addTodo, editTodo, deleteTodo, toggleDone };