import { dataObj } from "./storage";

class Todo {
    static currentId = 0;

    constructor(title, description, dueDate, priority, projectId) {
        this.id = Todo.currentId++;
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
    // dataObj.updateProject(projectId, project.todos);
    dataObj.dataStore();
}

function editTodo(title, description, dueDate, priority, projectId, todoId) {
    const project = dataObj.projects.find((project) => project.id === projectId);
    const todoIndex = project.todos.findIndex((todo) => todo.id === todoId);
    project.todos[todoIndex].title = title;
    project.todos[todoIndex].description = description;
    project.todos[todoIndex].dueDate = dueDate;
    project.todos[todoIndex].priority = priority;
    // const editedTodo = new Todo(title, description, dueDate, priority, projectId);
    // project.todos.splice(todoIndex, 1, editedTodo);
    // dataObj.updateProject(projectId, project.todos);
    dataObj.dataStore();
}

function deleteTodo(projectId, todoId) {
    const project = dataObj.projects.find((project) => project.id === projectId);
    const todoIndex = project.todos.findIndex((todo) => todo.id === todoId);
    project.todos.splice(todoIndex, 1);
    // dataObj.updateProject(projectId, project.todos);
    dataObj.dataStore();
}

export { loadTodo, addTodo, editTodo, deleteTodo };