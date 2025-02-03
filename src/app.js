class Todo {
    static editingTodo = null;

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = false;
    }
}

class Project {
    static currentProject = null;
    static editingProject = null;
    static specialProjects = [];
    static projects = [];

    constructor(title) {
        this.title = title;
        this.todos = [];
    }
}

//home project
function addHomeProject() {
    const homeProject = new Project("Home");
    Project.specialProjects.push(homeProject);
    updateHomeProject();
}

// function updateHomeProject() {
//     const homeProject = Project.specialProjects[0];
//     homeProject.todos = [];
//     const allProjects = JSON.parse(localStorage.getItem("_project")) ? JSON.parse(localStorage.getItem("_project")) : [];
//     allProjects.forEach((project) => {
//         homeProject.todos.push(...project.todos);
//     })
//     console.log(homeProject, homeProject.todos)
// }
function updateHomeProject() {
    const homeProject = Project.specialProjects[0];
    homeProject.todos = [];
    console.log(Project.projects)
    Project.projects.forEach((project) => {
        homeProject.todos.push(...project.todos);
    });
    console.log(homeProject, homeProject.todos);
}

// LocalStorage functions
function updateTodosStorage(project) {
    localStorage.setItem(project.title, JSON.stringify(project.todos));
}

function updateProjectsStorage() {
    const projects = JSON.parse(localStorage.getItem("_project")) ? JSON.parse(localStorage.getItem("_project")) : [];
    projects.forEach((project, index) => {
        const todos = JSON.parse(localStorage.getItem(project.title));
        Project.projects[index].todos = todos ? todos : [];
    });
    localStorage.setItem("_project", JSON.stringify(Project.projects));
}


// todo functions
function addTodo(title, description, dueDate, priority, project) {
    const todo = new Todo(title, description, dueDate, priority)
    project.todos.push(todo);
    updateTodosStorage(project);
    updateProjectsStorage();
    updateHomeProject()
}

function editTodo(title, description, dueDate, priority, project) {
    const todo = Todo.editingTodo;
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate || todo.dueDate;
    todo.priority = priority;
    updateTodosStorage(project);
    updateProjectsStorage();
    updateHomeProject()
}

function deleteTodo(index, project) {
    project.todos.splice(index, 1);
    updateTodosStorage(project);
    updateProjectsStorage();
    updateHomeProject();
}

function loadTodo(project) {
    const todos = localStorage.getItem(project.title);
    project.todos = todos ? JSON.parse(todos) : [];
}


//project functions
function addProject(title) {
    const project = new Project(title);
    Project.projects.push(project);
    Project.currentProject = project;
    updateProjectsStorage();
}

function loadProject() {
    const projects = JSON.parse(localStorage.getItem("_project"))
    if (projects) {
        Project.projects = [];
        projects.forEach((project) => {
            Project.projects.push(project);
        })
    } else {
    }
    updateProjectsStorage()
    return Project.projects;
}

function searchProject(title) {
    let project = Project.projects.find((project) => project.title === title)
        || Project.specialProjects.find((project) => project.title === title);

    return project;
}

function getCurrentProject() {
    return Project.currentProject;
}

function changeCurrentProject(project) {
    Project.currentProject = project;
}

function deleteProject(project) {
    const index = Project.projects.indexOf(project);
    Project.projects.splice(index, 1);
    updateProjectsStorage();
}

function editProject(newTitle) {
    const oldTitle = Project.editingProject.title;
    Project.editingProject.title = newTitle;
    const todos = localStorage.getItem(oldTitle);
    if (todos) {
        localStorage.setItem(newTitle, todos);
        localStorage.removeItem(oldTitle);
    }
    updateProjectsStorage();
    if (getCurrentProject().title === oldTitle) {
        changeCurrentProject(searchProject(newTitle));
    }
}
loadProject();
addHomeProject()
export { Todo, Project, loadTodo, addTodo, editTodo, deleteTodo, addProject, getCurrentProject, changeCurrentProject, searchProject, loadProject, deleteProject, editProject, addHomeProject };