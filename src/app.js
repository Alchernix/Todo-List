class Todo {
    static currentId = 0;

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = false;
        this.id = Todo.currentId++;
    }

    toggleDone() {
        this.isDone = !this.isDone;
    }
}

class Project {
    static currentProject;
    static projects = [];

    constructor(title) {
        this.title = title;
        this.todos = [];
    }
}


function addTodo(title, description, dueDate, priority, project) {
    const todo = new Todo(title, description, dueDate, priority)
    project.todos.push(todo);
    localStorage.setItem(project.title, JSON.stringify(project.todos));
}

function deleteTodo(index, project) {
    project.todos.splice(index, 1);
    localStorage.setItem(project.title, JSON.stringify(project.todos));
}

function loadTodo(project) {
    project.todos = [];
    const todos = localStorage.getItem(project.title) ? JSON.parse(localStorage.getItem(project.title)) : [];
    todos.forEach((todo) => {
        project.todos.push(todo);
    })
}

function addProject(title) {
    const project = new Project(title);
    Project.projects.push(project);
    Project.currentProject = project;
    localStorage.setItem("_project", JSON.stringify(Project.projects))
}

function loadProject() {
    const projects = JSON.parse(localStorage.getItem("_project"))
    if (projects) {
        Project.projects = [];
        projects.forEach((project) => {
            Project.projects.push(project);
        })
    } else {
        addProject("Default");
    }

    return Project.projects;
}

function searchProject(title) {
    return Project.projects.find((project) => project.title === title);
}

function getCurrentProject() {
    return Project.currentProject;
}

function changeCurrentProject(project) {
    Project.currentProject = project;
}


export { loadTodo, addTodo, deleteTodo, addProject, getCurrentProject, changeCurrentProject, searchProject, loadProject };