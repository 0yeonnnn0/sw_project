const $detailContainer = document.querySelector('.content-container');
const $coverImage = document.querySelector('.cover-image');
const $postContent = document.querySelector('.post-content');

//URL 쿼리 문자열에서 postId(id 매개변수 값)를 가져옵니다.
const postId = new URLSearchParams(window.location.search).get('id');
//추출된 postId 콘솔에 출력
console.log(postId);

async function fetchPost(postId) {
    //network > Fetch 에서 확인
    //URL로 GET 요청 보냄
    const response = await fetch(`http://localhost:1234/posts/${postId}`);
    //응답은 JSON 형식으로 변환 및 반환합니다.
    const data = await response.json();
    return data;
}

fetchPost(postId)
    //post 객체 데이터 사용, 페이지 HTML 요소를 업데이트
    .then((post) => {
        $coverImage.src = post.image;
        $postContent.innerText = post.content;
        //detailContainer의 innerHTML에 카테고리, 제목, 작성자 이미지, 작성자 닉네임, 날짜 포함
        $detailContainer.innerHTML = `<div class="category">온라인 집들이</div>
        <div class="title">${post.title}</div>
  
        <div class="profile">
          <div class="profile-image-container">
            <img
                src = "${post.authorImage}" 
                alt="프로필 이미지"
              class="profile-image"
            />
          </div>
          <div class="profile-detail">
            <span class="profile-detail-nickname">${post.author}</span>
            <span class="profile-detail-date">2021년 11월 27일</span>
          </div>
        </div>`
    })