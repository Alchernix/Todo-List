import { dataObj } from "./storage";
import { loadProject, addProject, editProject, deleteProject } from "./projects";
import { loadTodo, addTodo, editTodo, deleteTodo, toggleDone } from "./todos";

const specialProjectList = document.querySelector("#special-project-list");
const projectList = document.querySelector("#project-list");
const addProjectBtn = document.querySelector("#add-project-btn");

const projectDialog = document.querySelector("#project-dialog");
const projectTitleInput = document.querySelector("#input-project-title");
const projectDialogConfirmBtn = document.querySelector("#project-dialog-confirm-btn");
const projectDialogCancelBtn = document.querySelector("#project-dialog-cancel-btn");

const projectTitleEl = document.querySelector("#project-title");
const projectEditBtn = document.querySelector("#project-edit-btn");
const deleteProjectBtn = document.querySelector("#delete-project-btn");
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
    const notificationEls = document.querySelectorAll(".notification");
    for (let i = 0; i < 3; i++) {
        const notification = dataObj.projects[i].todos.reduce((acc, todo) => {
            return acc + (todo.isDone ? 0 : 1);
        }, 0);
        if (!notification) {
            notificationEls[i].classList.add("none")
        } else {
            notificationEls[i].textContent = notification;
            notificationEls[i].classList.remove("none")
        }
    }

    projectList.innerHTML = dataObj.projects.slice(3).map((project) => {
        const notification = project.todos.reduce((acc, todo) => {
            return acc + (todo.isDone ? 0 : 1);
        }, 0);
        return `
        <li class="project" data-id="${project.id}">
            <div class="project-list-project-title">${project.title}</div>
            <div class="notification ${notification ? "" : "none"}">${notification}</div>
        </li>
        `
    }).join('');
}

// 메인 화면(프로젝트 제목, 투두리스트)을 보여주는 함수
function displayMain(projectId) {
    const project = loadProject(projectId);
    projectTitleEl.textContent = project.title;
    if (projectId === 0 || projectId === 1 || projectId === 2) {
        projectEditBtn.classList.add("none");
        deleteProjectBtn.classList.add("none");
    } else {
        projectEditBtn.classList.remove("none");
        deleteProjectBtn.classList.remove("none");
    }
    projectTitleEl.dataset.id = project.id;
    todoListEl.innerHTML = project.todos.map(todo => `
        <li class="todo ${todo.priority}" data-id="${todo.id}">
            <input type="checkbox" class="todo-checkbox" ${todo.isDone ? "checked" : ""}>
            <div class="${todo.isDone ? "done" : ""}">${todo.title}</div>
            <div class="duedate">${todo.dueDate}</div>
            <i class="fa-solid fa-pen-to-square todo-edit-btn"></i>
            <i class="fa-solid fa-trash todo-delete-btn"></i>
        </li>
        `
    ).join('');

    //Today, This Week에는 투두 추가 못하게
    if (projectId === 1 || projectId === 2) {
        addTodoBtn.classList.add("none");
    } else {
        addTodoBtn.classList.remove("none");
    }
}

// 프로젝트 이름 수정 버튼
projectEditBtn.addEventListener("click", () => {
    const projectId = getCurrentProjectId();
    const currentTitle = projectTitleEl.textContent
    const projectEditInput = document.createElement("input");

    projectEditInput.type = "text";
    projectEditInput.value = currentTitle;
    projectTitleEl.classList.add("none");
    projectEditBtn.classList.add("none");
    projectTitleEl.after(projectEditInput);
    projectEditInput.focus();

    projectEditInput.addEventListener("blur", () => {
        const newTitle = projectEditInput.value.trim() || currentTitle;
        editProject(newTitle, projectId);
        displayProjectList();
        displayMain(projectId);
        projectEditInput.remove();
        projectTitleEl.classList.remove("none");
        projectEditBtn.classList.remove("none");
    });

})

// 프로젝트 삭제 버튼
deleteProjectBtn.addEventListener("click", () => {
    const projectId = getCurrentProjectId();
    deleteProject(projectId);
    displayProjectList();
    //인박스 프로젝트로 이동
    displayMain(0);
})

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
    todoDialogProjectSelect.innerHTML = dataObj.projects.map((project) => {
        if (project.id !== 1 && project.id !== 2) {
            return `
            <option value="${project.id}" ${currentProjectId == project.id ? "selected" : ""}>${project.title}</option>
            `
        } else {
            return ''
        }
    }
    ).join('');
    todoDialog.showModal()
})

// 투두 정보 + 수정버튼 + 삭제버튼 + 완료체크
todoListEl.addEventListener("click", (e) => {
    const todoEl = e.target.closest(".todo");
    const todoId = Number(todoEl.dataset.id);
    const projectId = getCurrentProjectId();
    const todo = loadTodo(projectId, todoId);

    if (!todoEl) {
        return;
    } else if (e.target.classList.contains("todo-edit-btn")) {
        // 투두 수정버튼 클릭시
        const currentProjectId = getCurrentProjectId();
        todoDialog.dataset.id = todo.id; //수정중인 투두를 구분하기 위해 추가
        todoDialogConfirmBtn.textContent = "Edit";
        titleInput.value = todo.title;
        descriptionInput.value = todo.description;
        dueDateInput.value = todo.dueDate;
        todoDialogPriorityBtns.forEach(btn => btn.classList.remove("selected"));
        if (todo.priority === "High") {
            todoDialogPriorityBtns[0].classList.add("selected");
        } else if (todo.priority === "Medium") {
            todoDialogPriorityBtns[1].classList.add("selected");
        } else if (todo.priority === "Low") {
            todoDialogPriorityBtns[2].classList.add("selected");
        }
        todoDialogProjectSelect.innerHTML = dataObj.projects.map((project) => {
            if (project.id !== 1 && project.id !== 2) {
                return `
                <option value="${project.id}" ${currentProjectId == project.id ? "selected" : ""}>${project.title}</option>
                `
            } else {
                return ''
            }
        }
        ).join('');
        todoDialog.showModal();
    } else if (e.target.classList.contains("todo-delete-btn")) {
        // 투두 삭제버튼 클릭시
        deleteTodo(projectId, todoId);
        displayMain(projectId);
    } else if (e.target.classList.contains("todo-checkbox")) {
        // 투두 체크박스 클릭시
        toggleDone(projectId, todoId);
        displayProjectList();
        displayMain(projectId);
    } else {
        //그냥 투두 클릭시
        todoDetailTitle.textContent = todo.title;
        todoDetailDescription.textContent = todo.description;
        todoDetailDuedate.textContent = todo.dueDate;
        todoDetailPriority.textContent = todo.priority;

        todoDetailDialog.showModal()
    }
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


    if (todoDialogConfirmBtn.textContent === "Add") {
        // todo 추가시
        const projectId = Number(todoDialogProjectSelect.value);
        addTodo(title, description, dueDate, priority, projectId);
        displayProjectList();
    } else if (todoDialogConfirmBtn.textContent === "Edit") {
        const currentProjectId = getCurrentProjectId();
        const newProjectId = Number(todoDialogProjectSelect.value);
        const todoId = Number(todoDialog.dataset.id);
        editTodo(title, description, dueDate, priority, currentProjectId, newProjectId, todoId);
    }
    displayMain(getCurrentProjectId());
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