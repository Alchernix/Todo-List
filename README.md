# 투두리스트 프로젝트
프론트엔드 실습용으로 만든 할일 관리 사이트입니다.<br>
코드는 main 브런치에서 볼 수 있습니다.<br>
## 프로젝트 소개
* **개발 기간**<br>
  2025/1/31 ~ 20253/3/1
* **개발한 사람**<br>
  1인 개발
* **사용 기술**
  html, css, javascript
## 기능 소개
* **메인 화면**<br>
![image](https://github.com/user-attachments/assets/d8f31a95-0ffc-4a8d-9906-3cb45a04dee3)
pc와 모바일의 ui가 조금 다릅니다. 해당 리드미는 pc를 기준으로 작성되었습니다.<br>
모바일에서는 프로젝트 이름 좌측의 메뉴 버튼을 누르면 사이드바가 나타납니다.<br>
사이드바에서는 3개의 기본 카테고리(인박스, 투데이, 이번주)와 추가한 카테고리를 보여줍니다.<br>
완료하지 않은 할일의 수가 각 프로젝트 옆에 보여집니다.<br>
* **프로젝트**<br>
![image](https://github.com/user-attachments/assets/ccfc0842-b7e8-4f6a-bbd2-6d4c84d7d354)
사이드바의 Add New Project 버튼으로 프로젝트를 추가할 수 있습니다.<br>
프로젝트 이름 우측의 수정 버튼으로 프로젝트 이름을 수정할 수 있습니다.<br>
우측 상단의 Delete Project 버튼으로 프로젝트를 삭제할 수 있으며, 프로젝트 삭제시 해당 프로젝트의 할일이 전부 삭제됩니다.<br>
* **할일**<br>
![image](https://github.com/user-attachments/assets/f29b43fc-d277-4727-8634-1891c3aef989)
(할일 입력 창의 모습)<br>
Add New Task 버튼으로 인박스와 직접 만든 프로젝트에 할일을 추가할 수 있습니다.<br>
좌측의 체크박스를 클릭하는 것으로 할일을 완료할 수 있습니다.<br>
우측의 수정 버튼과 삭제 버튼으로 수정/삭제가 가능합니다. 수정 시에는 할일의 프로젝트를 옮기는 것도 가능합니다.<br>
![image](https://github.com/user-attachments/assets/ef1b8471-8f46-4944-9ef9-2086c86c60c1)
(할일 상세보기 창의 모습)<br>
할일을 클릭하여 입력한 세부사항을 볼 수 있습니다.<br>
* **정렬, 필터링**<br>
할일은 기본적으로 추가순(Added)으로 정렬되어 있습니다.<br>
정렬 버튼(Added)를 클릭 시 총 4가지의 다른 순서(추가순, 이름순, 날짜순, 우선순위 순)로 정렬할 수 있습니다.<br>
기본적으로 해당 카테고리의 모든 할일 목록(Show All)을 보여줍니다.<br>
Show Incomplete 를 클릭시 완료하지 않은 할일만 보여줍니다.<br>
* **검색**<br>
![image](https://github.com/user-attachments/assets/e9518ae1-9686-4bf6-8a13-705bc9cca73b)
사이드바의 Search 버튼을 누르면 검색창으로 넘어갑니다.<br>
검색창에서도 할일 완료/상세보기/수정/삭제가 가능합니다.<br>
* **일정 관리**<br>
![image](https://github.com/user-attachments/assets/e14a0d1d-a83f-4fe8-8d6f-4adcf3df84e7)
(Today 카테고리의 모습)<br>
date-fns를 이용해서 날짜 관리를 하고 있습니다.<br>
Today에서는 마감 날짜가 오늘인 할일 목록을 보여줍니다.<br>
This Week에서는 마감 날짜가 이번주인 할일 목록을 보여줍니다.<br>
* **저장 기능**<br>
로컬스토리지를 이용한 저장기능이 구현되어 있습니다.<br>


