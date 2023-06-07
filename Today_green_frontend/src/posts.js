// $변수 -> DOM object
const $postsContainer = document.querySelector('.posting-container');

const post = {};

async function fetchPosts() {
    //URL로 GET 요청 보냄
    const response = await fetch('http://localhost:1234/posts');
    //응답은 JSON 형식으로 변환
    const data = await response.json();
    return data;
}
//사진, 제목, 작성자 이미지 및 작성자 닉네임 포함하여 게시물 반환
const getPostTemplate = (post) => {
    return `
      <a href="/detail.html?id=${post.id}">
      <div class="posting-wrapper">
        <div class="posting-image-container">
          <img
            src="${post.image}"
            alt="게시글 이미지"
          />
        </div>
        <h2 class="">${post.title}</h2>
        <div class="profile-wrapper">
          <div class="profile-image-container">
            <img
              class="profile-image"
              src="${post.authorImage}"
              alt="profile-image"
            />
          </div>
          <span class="profile-nickname">${post.author}</span>
        </div>
      </div>
    `;
  };

//게시물 목록을 가져오고 페이지에 표시하는 코드
fetchPosts().then((posts) => {
    console.log(posts); // length가 6인 Array 형태 
    console.log(typeof posts);
    // join을 안 해준 상태라면 "," 같은 불필요한 문자열이 들어가므로 join
    $postsContainer.innerHTML = posts.map((post) => getPostTemplate(post)).join("");
})
