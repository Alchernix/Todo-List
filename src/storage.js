// 실행 시 데이터 객체를 기본적으로 생성
// 전체 프로젝트의 정보를 저장하는 객체
const dataObj = {
    projects: [],
    currentTodoId: 0,
    //로컬스토리지에서 데이터를 불러오는 메서드
    loadDataObj() {
        const data = JSON.parse(localStorage.getItem("_data")) || [];
        this.currentTodoId = Number(JSON.parse(localStorage.getItem("_currentTodoId"))) || 0;
        this.projects = data;
        return this.projects;
    },
    dataStore() {
        localStorage.setItem("_data", JSON.stringify(this.projects));
        localStorage.setItem("_currentTodoId", JSON.stringify(this.currentTodoId));
    },
    getNewProjectId() {
        const lastId = this.projects.at(-1).id;
        return lastId + 1;
    },
    getNewTodoId() {
        return this.currentTodoId + 1;
    }
}

export { dataObj };