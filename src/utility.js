import { dataObj } from "./storage";
import { loadProject } from "./projects";
import { getCurrentProjectId, displayMain } from "./DOM";
import { format } from "date-fns"

const projectTitleEl = document.querySelector("#project-title");

const searchEl = document.querySelector("#sidebar-search");
const searchSection = document.querySelector("#search-section");
const searchInput = document.querySelector("#search-input");
const searchResultEl = document.querySelector("#search-result");
const mainEl = document.querySelector("#main");

const sortBtn = document.querySelector("#sort-container");
const sortByTextEl = document.querySelector("#sort-by");

const showAllBtn = document.querySelector("#show-all-btn");
const showIncompleteBtn = document.querySelector("#show-incomplete-btn");


// 검색
searchEl.addEventListener("click", () => {
    mainEl.classList.add("none")
    projectTitleEl.dataset.id = "search";
    searchSection.classList.remove("none");
    // document.querySelector("#search-btn").addEventListener("click", search);
})

searchSection.addEventListener("submit", (e) => {
    e.preventDefault();
    search();
});

function search() {
    const searchValue = searchInput.value.toLowerCase();

    dataObj.searchResult = [];

    dataObj.projects.forEach((project) => {
        if (project.id !== 1 && project.id !== 2) {
            project.todos.forEach((todo) => {
                const title = todo.title.toLowerCase();
                if (title.includes(searchValue)) {
                    dataObj.searchResult.push(todo);
                }
            })
        }
    })

    displaySearchResult(dataObj.searchResult);

}

function displaySearchResult(result) {
    searchResultEl.innerHTML = result.map((todo) => {
        return `
        <li class="todo ${todo.priority}" data-id="${todo.id}">
            <input type="checkbox" class="todo-checkbox" ${todo.isDone ? "checked" : ""}>
            <div class="${todo.isDone ? "done" : ""}">${todo.title}</div>
            <div class="duedate">${format(todo.dueDate, 'yyyy-MM-dd')}</div>
            <i class="fa-solid fa-pen-to-square todo-edit-btn"></i>
            <i class="fa-solid fa-trash todo-delete-btn"></i>
        </li>
        `
    }).join('');
}

function resetSearchSection() {
    searchInput.value = '';
    searchResultEl.innerHTML = '';
}


// 정렬
// 버튼 클릭시 정렬하는 함수 - 누르면 다음 정렬로 바뀜
sortBtn.addEventListener("click", () => {
    const sortBy = sortByTextEl.textContent;
    const projectId = getCurrentProjectId();
    const todos = loadProject(projectId).todos;

    if (sortBy === "Added") {
        // 기본설정 - 추가순
        // 추가순에서 한번 클릭시 이름순으로 바꿈
        todos.sort((a, b) => a.title.localeCompare(b.title));
        sortByTextEl.textContent = "Name";
    } else if (sortBy === "Name") {
        // 이름순에서 한번 클릭시 날짜순으로 바꿈
        todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        sortByTextEl.textContent = "Date";
    } else if (sortBy === "Date") {
        // 날짜순에서 한번 클릭시 우선순위순으로 바꿈
        todos.sort(prioritySort);
        sortByTextEl.textContent = "Priority";
    } else if (sortBy === "Priority") {
        // 우선순위순에서 한번 클릭시 추가순으로 바꿈
        todos.sort((a, b) => a.id - b.id);
        sortByTextEl.textContent = "Added";
    }
    displayMain(projectId);
})

// 화면 로드시 정렬하는 함수 - 누르면 현재 정렬로 바뀜
function sortTodos(projectId) {
    const sortBy = sortByTextEl.textContent;
    const todos = loadProject(projectId).todos;

    if (sortBy === "Added") {
        // 기본설정 - 추가순
        todos.sort((a, b) => a.id - b.id);
    } else if (sortBy === "Name") {
        todos.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Date") {
        todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === "Priority") {
        todos.sort(prioritySort);
    }
}

function prioritySort(a, b) {
    const priority = { High: 1, Medium: 0, Low: -1 }
    return priority[b.priority] - priority[a.priority];
}

function sortAllTodosByAdded() {
    dataObj.projects.forEach((project) => {
        project.todos.sort((a, b) => a.id - b.id);
    })

}


// 필터
showAllBtn.addEventListener("click", () => {
    showIncompleteBtn.classList.remove("sort-selected");
    showAllBtn.classList.add("sort-selected");
    const projectId = getCurrentProjectId();
    displayMain(projectId);
})

showIncompleteBtn.addEventListener("click", () => {
    showAllBtn.classList.remove("sort-selected");
    showIncompleteBtn.classList.add("sort-selected");
    const projectId = getCurrentProjectId();
    displayMain(projectId);
})

export { search, resetSearchSection, sortTodos, sortAllTodosByAdded, displaySearchResult };