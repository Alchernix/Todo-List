import "./style.css";
import { Todo, Project, loadTodo, addTodo, deleteTodo, getCurrentProject, changeCurrentProject, addProject, searchProject, loadProject, editTodo, deleteProject, editProject } from "./app.js"

// DOM
const addTodoBtn = document.querySelector("#add-todo-btn");
const todoList = document.querySelector("#todo-list");

const todoDialog = document.querySelector("#todo-dialog");
const todoDialogForm = document.querySelector("#todo-dialog-form");
const todoDialogCancelBtn = document.querySelector("#todo-dialog-cancel-btn");

const editTodoDialog = document.querySelector("#edit-todo-dialog");
const editTodoDialogForm = document.querySelector("#edit-todo-dialog-form");
const editTodoDialogCancelBtn = document.querySelector("#edit-todo-dialog-cancel-btn");

const projectDialog = document.querySelector("#project-dialog");
const projectDialogForm = document.querySelector("#project-dialog-form");
const projectDialogCancelBtn = document.querySelector("#project-dialog-cancel-btn");

const editProjectDialog = document.querySelector("#edit-project-dialog");
const editProjectDialogForm = document.querySelector("#edit-project-dialog-form");
const editProjectDialogCancelBtn = document.querySelector("#edit-project-dialog-cancel-btn");

const todoDetailDialog = document.querySelector("#todo-detail-dialog");
const todoDetailCloseBtn = document.querySelector("#todo-datail-close-btn");

const projectUl = document.querySelector("#projects");
const projectTitleEl = document.querySelector("#project-title");


// randering functions
function displayTodo() {
    const project = getCurrentProject();
    // console.log(project);
    projectTitleEl.textContent = project.title;
    loadTodo(project);
    todoList.innerHTML = project.todos.map((todo, index) => `
    <li class="todo" data-id="${index}">
        <input type="checkbox" class="todo-checkbox">
        <div class="todo-title">${todo.title}</div>
        <div class="duedate">${todo.dueDate}</div>
        <i class="fa-solid fa-pen-to-square todo-edit-btn"></i>
        <i class="fa-solid fa-trash todo-delete-btn"></i>
    </li>
    `).join('');
}

function displayProject() {
    const specialProjects = Project.specialProjects;
    const projects = loadProject();
    const currentProject = getCurrentProject();

    projectUl.innerHTML = specialProjects.map((project) => `
    <li class="project ${currentProject.title === project.title ? "chosen" : ""}">
    <div class="project-list-project-title">${project.title}</div>
    </li>
    `).join('');

    projectUl.innerHTML += projects.map((project) => `
    <li class="project ${currentProject.title === project.title ? "chosen" : ""}">
    <div class="project-list-project-title">${project.title}</div>
    <i class="fa-solid fa-ellipsis-vertical project-option"></i>
    </li>
    `).join('');

    const li = document.createElement("li");
    const addProjectBtn = document.createElement("button");
    addProjectBtn.textContent = "Add project";
    addProjectBtn.classList.add("add-project-btn");
    addProjectBtn.id = "add-project-btn";
    addProjectBtn.addEventListener("click", () => {
        projectDialog.showModal();
    })
    li.appendChild(addProjectBtn);
    projectUl.appendChild(li);
}

// event listeners
projectUl.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-project-btn") || !e.target.closest(".project")) {
        return;
    }

    const projectLi = e.target.closest(".project");
    const title = projectLi.querySelector(".project-list-project-title").textContent;
    const project = searchProject(title);

    if (e.target.classList.contains("project-option")) {
        document.querySelectorAll('.option-dialog').forEach(menu => menu.remove());

        const option = document.createElement("div");
        option.classList.add("option-dialog");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
            editProjectDialog.showModal();
            Project.editingProject = project;
        })

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            if (getCurrentProject().title === project.title) {
                const defaultProject = searchProject("Home");
                changeCurrentProject(defaultProject);
                deleteProject(project);
                displayProject();
                displayTodo();
            } else {
                deleteProject(project);
                displayProject();
            }
        })

        option.appendChild(editBtn);
        option.appendChild(deleteBtn);
        projectLi.appendChild(option);

        const removeOptionDialog = (e) => {
            if (!option.contains(e.target) && !editBtn.contains(e.target) && !deleteBtn.contains(e.target)) {
                option.remove();
                document.removeEventListener("click", removeOptionDialog);
            }
        }

        setTimeout(() => {
            document.addEventListener("click", removeOptionDialog);
        }, 0);

    } else if (e.target.classList.contains("option-dialog") || e.target.tagName === "BUTTON") {
        return;
    } else if (projectLi) {
        changeCurrentProject(project);
        displayProject();
        displayTodo();
    }
})

addTodoBtn.addEventListener("click", () => {
    todoDialog.showModal();
})

editTodoDialogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#edit-todo-title").value;
    const description = document.querySelector("#edit-todo-description").value;
    const dueDate = document.querySelector("#edit-todo-duedate").value;
    const priority = document.querySelector("#edit-todo-priority").value;
    const project = getCurrentProject();
    editTodo(title, description, dueDate, priority, project);
    displayTodo();
    editTodoDialog.close();
})

editTodoDialogCancelBtn.addEventListener("click", () => {
    editTodoDialog.close();
})


todoDialogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#input-todo-title").value;
    const description = document.querySelector("#input-todo-description").value;
    const dueDate = document.querySelector("#input-todo-duedate").value;
    const priority = document.querySelector("#input-todo-priority").value;
    const project = getCurrentProject();

    addTodo(title, description, dueDate, priority, project);
    displayTodo();

    todoDialog.close();
})

todoDialogCancelBtn.addEventListener("click", () => {
    todoDialog.close();
})


projectDialogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#input-project-title").value;
    addProject(title);
    displayProject();
    displayTodo();
    projectDialog.close();
})

projectDialogCancelBtn.addEventListener("click", () => {
    projectDialog.close();
})

editProjectDialogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#edit-input-project-title").value;
    editProject(title);
    displayProject();
    displayTodo();
    editProjectDialog.close();
})

editProjectDialogCancelBtn.addEventListener("click", () => {
    editProjectDialog.close();
})


todoList.addEventListener("click", (e) => {
    const todoEl = e.target.closest(".todo");
    const index = todoEl.dataset.id;
    const project = getCurrentProject();
    const todo = project.todos[index];

    if (e.target.classList.contains("todo-delete-btn")) {
        deleteTodo(index, getCurrentProject());
        displayTodo();
    } else if (e.target.classList.contains("todo-edit-btn")) {
        Todo.editingTodo = todo;
        document.querySelector("#edit-todo-title").value = todo.title;
        document.querySelector("#edit-todo-description").value = todo.description;
        document.querySelector("#edit-todo-duedate").value = todo.dueDate;
        document.querySelector("#edit-todo-priority").value = todo.priority;
        editTodoDialog.showModal();
    } else if (e.target.tagName === "INPUT") {
        todo.isDone = e.target.checked;
    } else {

        document.querySelector("#todo-detail-title").textContent = todo.title;
        document.querySelector("#todo-detail-description").textContent = todo.description;
        document.querySelector("#todo-detail-duedate").textContent = todo.dueDate;
        document.querySelector("#todo-detail-priority").textContent = todo.priority;

        todoDetailDialog.showModal();
    }
})

todoDetailCloseBtn.addEventListener("click", () => {
    todoDetailDialog.close();
})

// loadProject();
changeCurrentProject(Project.specialProjects[0]);
displayProject();
displayTodo();
