import { dataObj } from "./storage";
import { format } from "date-fns"

const projectTitleEl = document.querySelector("#project-title");

const searchEl = document.querySelector("#sidebar-search");
const searchSection = document.querySelector("#search-section");
const searchInput = document.querySelector("#search-input");
const searchResultEl = document.querySelector("#search-result");
const mainEl = document.querySelector("#main");

searchEl.addEventListener("click", () => {
    mainEl.classList.add("none")
    projectTitleEl.dataset.id = "search";
    searchSection.classList.remove("none");

    document.querySelector("#search-btn").addEventListener("click", search);
})

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

export { search, resetSearchSection };