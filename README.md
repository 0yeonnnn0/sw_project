# 소프트웨어 프로젝트1 과제
### 소프트웨어학과 김동연 (20200191)
<br>

# Today, Green - FrontEnd
오늘, 그린 프론트엔드

## 개요
오늘, 그린의 홈페이지 및 커뮤니티, 글 내용, 글 작성 페이지 구현

## 주석 단 파일
index.html  / index.js<br>
detail.html / detail.js<br>
write.html  / write.js<br>
posts.html  / posts.js<br>

### 위치
프론트 - html<br>
sw_project/Today_green_frontend/<br>
프론트 - 자바스크립트<br>
sw_project/Today_green_frontend/src/<br>

## 구현 화면
### 홈
1. index.html
    - 광고 및 인기 게시글을 띄워줄 공간
    - 로그인 페이지와 연결
    - 각종 나타낸 부분들을 각주로 표시함
2. index.js
    - 사이드바 토글과 관련된 기능들을 표시함.
<br>

### 커뮤니티
1. posts.html
    - 이미지 썸네일을 표시하여 사진 중심의 커뮤니티임을 나타냄
    - 제목을 사진 밑에 강조 표시하여 가독성에 방해받지 않게 제작
2. posts.js
    - URL 쿼리 문자열의 postId 매개변수를 기반으로 서버에서 게시물을 가져옵니다. 
    - 게시물 데이터를 가져오면 해당 데이터로 페이지의 관련 HTML 요소를 업데이트함
<br>

### 글 작성
1. write.html
    - 제목, 내용 작성, 이미지 업로드 및 발행
2. write.js
    - 게시물 작성 폼의 유효성 검사, 이미지 업로드 및 게시물 전송과 관련된 기능을 구현
<br>

### 글 상세 페이지
1. detail.html
    - 제목, 글 내용, 이미지 업로드 기능, 발행 일자 구현
2. detail.js
    - URL 쿼리 문자열에서 가져온 postId 매개변수를 기반으로 서버에서 게시물을 가져와서 페이지의 HTML 요소를 업데이트
<br>

# Today, Green - BackEnd
오늘, 그린 백엔드 (로그인 기능)

## 개요
로그인, 회원가입, 회원정보 수정, 회원탈퇴 기능 구현<br>
Mock server 를 통해 user 정보를 rest api를 통해 추가/읽기/수정/삭제를 구현한다.

## 주석 단 파일
signin.js<br>
signup.js<br>
mypage.js<br>
mypageEdit.js<br>

### 위치
백엔드 자바스크립트<br>
sw_project/Today_green_backend/public/js/<br>

## 로그인 알고리즘 (JWT)
1. signin.html에서 로그인 시도(id, password 전송)
2. 서버의 mock data에서 유효한 id, password인지 확인 / 유효한 경우 jwt 생성하여 cookie에 저장
3. 발급한 JWT를 client로 보낸다.
4. 이후 요청 시 JWT를 함께 보낸다.
5. 서버에서 토큰이 조작되어 있는지, 유효기간이 유효한지 확인
6. client에게 response를 보낸다.

## 구현 화면
### 로그인 페이지 
1. signin.html
    - 로그인 시 필요한 이메일/비밀번호, 자동 로그인 체크박스
    - 비밀번호 찾기 및 회원가입 버튼까지 구현
2. signin.js
    - 이 코드는 로그인 페이지에서 입력 필드의 유효성 검사, 로그인 요청 처리, 비밀번호 찾기 팝업창 기능을 구현합니다.

### 회원가입 페이지 
1. signup.html
    - 회원가입 시 필요한 정보인 이름, 이메일, 휴대전화, 비밀번호, 비밀번호 확인 및 회원가입 완료 버튼을 구현
2. signup.js
    - 회원가입 페이지에서 이메일 중복 확인, 입력 필드의 유효성 검사 및 회원가입 요청을 처리하는 기능을 구현합니다.

### 마이페이지
1. mypage.html
    - 자신의 이메일, 이름 및 휴대전화를 보여줍니다.
    - 정보 수정 / 로그아웃 버튼 구현
2. mypage.js
    - 사용자 인증 상태 확인, 마이페이지 입력 필드 값 할당, 프로필 편집 페이지로 이동, 로그아웃 기능 구현

### 마이페이지 수정 
1. mypage_edit.html
    - 마이페이지 수정, 이메일, 이름, 휴대전화, 비밀번호, 비밀번호 확인 출력
    - 수정 완료, 회원 탈퇴 버튼 구현
2. mypageEdit.js
    - 사용자 정보 수정, 계정 삭제, 팝업 처리 등 마이페이지 관련 기능을 구현
    - 사용자의 입력을 유효성 검사하고 서버와의 통신을 통해 정보를 업데이트 / 삭제

