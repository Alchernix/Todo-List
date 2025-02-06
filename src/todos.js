import { dataObj } from "./storage";

class Todo {
    constructor(title, description, dueDate, priority, projectId) {
        this.id = dataObj.currentTodoId++;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = false;
        this.projectId = projectId;
    }
}

//로컬스토리지에서 특정 투두를 불러오는 함수 -> 투두의 세부사항을 볼 때 사용
function loadTodo(projectId, todoId) {
    const project = dataObj.projects.find((project) => project.id === projectId);
    const todo = project.todos.find((todo) => todo.id === todoId);
    return todo;
}

function addTodo(title, description, dueDate, priority, projectId) {
    const todo = new Todo(title, description, dueDate, priority, projectId);
    const project = dataObj.projects.find((project) => project.id === projectId);
    project.todos.push(todo);
    dataObj.dataStore();
}

function editTodo(title, description, dueDate, priority, currentProjectId, newProjectId, todoId) {
    const project = dataObj.projects.find((project) => project.id === currentProjectId);
    const todoIndex = project.todos.findIndex((todo) => todo.id === todoId);
    project.todos[todoIndex].title = title;
    project.todos[todoIndex].description = description;
    project.todos[todoIndex].dueDate = dueDate;
    project.todos[todoIndex].priority = priority;
    project.todos[todoIndex].projectId = newProjectId;

    if (currentProjectId !== newProjectId) {
        const todo = project.todos.splice(todoIndex, 1)[0];
        const newProject = dataObj.projects.find((project) => project.id === newProjectId);
        newProject.todos.push(todo);
    }

    dataObj.dataStore();
}

function deleteTodo(projectId, todoId) {
    const project = dataObj.projects.find((project) => project.id === projectId);
    const todoIndex = project.todos.findIndex((todo) => todo.id === todoId);
    project.todos.splice(todoIndex, 1);
    dataObj.dataStore();
}

function toggleDone(projectId, todoId) {
    const project = dataObj.projects.find((project) => project.id === projectId);
    const todo = project.todos.find((todo) => todo.id === todoId);
    todo.isDone = !todo.isDone;
    dataObj.dataStore();
}

export { loadTodo, addTodo, editTodo, deleteTodo, toggleDone };