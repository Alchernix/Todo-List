import "./style.css";
import { loadTodo, addTodo, deleteTodo, getCurrentProject, changeCurrentProject, addProject, searchProject, loadProject } from "./app.js"


const addTodoBtn = document.querySelector("#add-todo-btn");
const todoList = document.querySelector("#todo-list");

const todoDialog = document.querySelector("#todo-dialog");
const todoDialogForm = document.querySelector("#todo-dialog-form");

const projectDialog = document.querySelector("#project-dialog");
const projectDialogForm = document.querySelector("#project-dialog-form");

const todoDetailDialog = document.querySelector("#todo-detail-dialog");
const todoDetailCloseBtn = document.querySelector("#todo-datail-close-btn");

const projectUl = document.querySelector("#projects");

projectUl.addEventListener("click", (e) => {
    if (e.target.classList.contains("project")) {
        const project = searchProject(e.target.textContent);
        changeCurrentProject(project);
        displayProject();
        displayTodo();
    }
})

addTodoBtn.addEventListener("click", () => {
    todoDialog.showModal();
})

todoDialogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#input-todo-title").value;
    const description = document.querySelector("#input-type-description").value;
    const dueDate = document.querySelector("#input-todo-duedate").value;
    const priority = document.querySelector("#input-todo-priority").value;
    const project = getCurrentProject();

    addTodo(title, description, dueDate, priority, project);
    displayTodo();

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

function displayTodo() {
    const project = getCurrentProject();
    const projectTitleEl = document.querySelector("#project-title");
    projectTitleEl.textContent = project.title;
    loadTodo(project);
    let todoHtml = '';

    project.todos.forEach((todo, index) => {
        todoHtml += `
        <li class="todo" data-id="${index}">
            <input type="checkbox">
            <div class="todo-title">${todo.title}</div>
            <div class="duedate">${todo.dueDate}</div>
            <button class="todo-delete-btn" data-id="${index}">Delete</button>
        </li>`;
    })
    todoList.innerHTML = todoHtml;
}

function displayProject() {
    const projects = loadProject();
    const projectUl = document.querySelector("#projects");
    let projectUlHtml = "";
    projects.forEach((project) => {
        if (getCurrentProject().title === project.title) {
            projectUlHtml += `<li class="project chosen">${project.title}</li>`
        } else {
            projectUlHtml += `<li class="project">${project.title}</li>`
        }

    })
    projectUl.innerHTML = projectUlHtml;

    const li = document.createElement("li");
    const addProjectBtn = document.createElement("button");
    addProjectBtn.textContent = "Add project";
    addProjectBtn.classList.add("add-project-btn");
    addProjectBtn.setAttribute("id", "add-project-btn");
    addProjectBtn.addEventListener("click", () => {
        projectDialog.showModal();
    })
    li.appendChild(addProjectBtn);
    projectUl.appendChild(li);

}

todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("todo-delete-btn")) {
        const index = e.target.dataset.id;
        deleteTodo(index, getCurrentProject());
        displayTodo();
    } else if (e.target.tagName === "INPUT") {

    } else {
        const todoEl = e.target.closest(".todo");
        const index = todoEl.dataset.id;
        const project = getCurrentProject();
        const todo = project.todos[index];
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

loadProject();
changeCurrentProject(searchProject("Default"));
displayProject();
displayTodo();
