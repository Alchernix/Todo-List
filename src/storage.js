// 실행 시 데이터 객체를 기본적으로 생성
// 전체 프로젝트의 정보를 저장하는 객체
const dataObj = {
    projects: [],
    // dataObj에서 프로젝트의 todo를 업데이트 하는 메서드
    // updateProject(projectId, todos) {
    //     const projectIndex = this.projects.findIndex((project) => project.id === projectId);
    //     this.projects[projectIndex].todos = todos;
    // },
    //로컬스토리지에서 데이터를 불러오는 메서드
    loadDataObj() {
        const data = JSON.parse(localStorage.getItem("_data")) || [];
        this.projects = data;
        return this.projects;
    },
    dataStore() {
        localStorage.setItem("_data", JSON.stringify(this.projects));
    },
    getnewProjectId() {
        const lastId = this.projects[this.projects.length - 1].id;
        return lastId + 1;
    }
}

export { dataObj };