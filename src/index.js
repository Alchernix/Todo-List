import "./style.css";

import { dataObj } from "./storage";
import { addProject, Project } from "./projects";
import { displayMain, displayProjectList } from "./DOM";
import { } from "./utility";

const INBOX_ID = 0;
const THIS_WEEK_ID = 2;

// 새로고침 시 데이터 오브젝트를 로드;
const projects = dataObj.loadDataObj();
// 첫 로딩 시 기본 프로젝트 생성
if (projects.length === 0) {
    addProject("Inbox");
    addProject("Today");
    addProject("This Week");
} else {
    Project.currentId = dataObj.getNewProjectId();
}

displayProjectList();
displayMain(INBOX_ID);