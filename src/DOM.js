import { dataObj } from "./storage";
import { loadProject, addProject } from "./projects";
import { loadTodo, addTodo } from "./todos";

const specialProjectList = document.querySelector("#special-project-list");
const projectList = document.querySelector("#project-list");
const addProjectBtn = document.querySelector("#add-project-btn");

const projectDialog = document.querySelector("#project-dialog");
const projectTitleInput = document.querySelector("#input-project-title");
const projectDialogConfirmBtn = document.querySelector("#project-dialog-confirm-btn");
const projectDialogCancelBtn = document.querySelector("#project-dialog-cancel-btn");

const projectTitleEl = document.querySelector("#project-title");
const todoListEl = document.querySelector("#todo-list");
const addTodoBtn = document.querySelector("#todo-add-btn");

const todoDialog = document.querySelector("#todo-dialog");
const titleInput = document.querySelector("#input-todo-title");
const descriptionInput = document.querySelector("#input-todo-description");
const dueDateInput = document.querySelector("#input-todo-duedate");
const todoDialogConfirmBtn = document.querySelector("#todo-dialog-confirm-btn");
const todoDialogCancelBtn = document.querySelector("#todo-dialog-cancel-btn");
const todoDialogProjectSelect = document.querySelector("#project-select");
const todoDialogPriorityBtns = document.querySelectorAll(".priority-btn");

const todoDetailDialog = document.querySelector("#todo-detail-dialog");
const todoDetailTitle = document.querySelector("#todo-detail-title");
const todoDetailDescription = document.querySelector("#todo-detail-description");
const todoDetailDuedate = document.querySelector("#todo-detail-duedate");
const todoDetailPriority = document.querySelector("#todo-detail-priority");
const todoDetailDialogCloseBtn = document.querySelector("#todo-datail-close-btn");

function getCurrentProjectId() {
    return Number(projectTitleEl.dataset.id);
}

// 사이드바의 프로젝트 리스트를 보여주는 함수 - 특별한 프로젝트들은 html에 있으므로 생략
function displayProjectList() {
    projectList.innerHTML = dataObj.projects.slice(3).map((project) => `
    <li class="project" data-id="${project.id}">
        <div class="project-list-project-title">${project.title}</div>
        <div>1</div>
    </li>
    `).join('');
}

// 메인 화면(프로젝트 제목, 투두리스트)을 보여주는 함수
function displayMain(projectId) {
    const project = loadProject(projectId);
    projectTitleEl.textContent = project.title;
    projectTitleEl.dataset.id = project.id;
    todoListEl.innerHTML = project.todos.map(todo => `
        <li class="todo ${todo.priority}" data-id="${todo.id}">
            <input type="checkbox" id="">
            <div>${todo.title}</div>
            <div class="duedate">${todo.dueDate}</div>
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-solid fa-trash"></i>
        </li>
        `
    ).join('');
}

// 사이드바 클릭시 해당 프로젝트로 이동하는 함수
specialProjectList.addEventListener("click", (e) => {
    const projectEl = e.target.closest(".special-project");
    if (!projectEl) {
        return;
    }
    const projectId = Number(projectEl.dataset.id);
    displayMain(projectId);
})

projectList.addEventListener("click", (e) => {
    const projectEl = e.target.closest(".project");
    console.log(projectEl)
    if (!projectEl) {
        return;
    }
    const projectId = Number(projectEl.dataset.id);
    displayMain(projectId);
})

// 프로젝트 추가 버튼
addProjectBtn.addEventListener("click", () => {
    projectDialog.showModal();
})

// 프로젝트 추가 다이어로그
projectDialogConfirmBtn.addEventListener("click", () => {
    const title = projectTitleInput.value;
    const projectId = addProject(title);
    displayMain(projectId);
    displayProjectList();
    projectDialog.close();
})

projectDialogCancelBtn.addEventListener("click", () => {
    projectDialog.close();
})

// 투두 추가 버튼
addTodoBtn.addEventListener("click", () => {
    const currentProjectId = getCurrentProjectId();
    todoDialogConfirmBtn.textContent = "Add";
    titleInput.value = '';
    descriptionInput.value = '';
    dueDateInput.value = '';
    todoDialogPriorityBtns.forEach(btn => btn.classList.remove("selected"));
    todoDialogPriorityBtns[1].classList.add("selected");
    todoDialogProjectSelect.innerHTML = dataObj.projects.map((project) => `
    <option value="${project.id}" ${currentProjectId == project.id ? "selected" : ""}>${project.title}</option>
    `).join('');
    todoDialog.showModal()
})

// 투두 정보 다이어로그
todoListEl.addEventListener("click", (e) => {
    const todoEl = e.target.closest(".todo");
    if (!todoEl) {
        return;
    }

    const todoId = Number(todoEl.dataset.id);

    const projectId = getCurrentProjectId();
    const todo = loadTodo(projectId, todoId);

    todoDetailTitle.textContent = todo.title;
    todoDetailDescription.textContent = todo.description;
    todoDetailDuedate.textContent = todo.dueDate;
    todoDetailPriority.textContent = todo.priority;

    todoDetailDialog.showModal()
})

todoDetailDialogCloseBtn.addEventListener("click", () => {
    todoDetailDialog.close();
})

// 투두 추가/수정 다이어로그
todoDialogConfirmBtn.addEventListener("click", () => {
    const title = titleInput.value;
    const description = descriptionInput.value;
    const dueDate = dueDateInput.value;
    const priority = document.querySelector(".selected").textContent;
    const projectId = Number(todoDialogProjectSelect.value);
    if (todoDialogConfirmBtn.textContent === "Add") {
        // todo 추가시
        addTodo(title, description, dueDate, priority, projectId)
        displayMain(getCurrentProjectId());

    } else if (todoDialogConfirmBtn.textContent === "Edit") {
        // todo 수정시
    }
    todoDialog.close();
})

todoDialogPriorityBtns.forEach((button) => {
    button.addEventListener("click", () => {
        todoDialogPriorityBtns.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
    })
})

todoDialogCancelBtn.addEventListener("click", () => {
    todoDialog.close();
})



export { displayMain, displayProjectList };