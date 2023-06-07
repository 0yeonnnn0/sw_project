export const POST_MAX_FILE_SIZE = 1000 * 1000 * 1; // 약 1MB

const $titleInput = document.querySelector('.title-input');
const $contentInput = document.querySelector('.content-input');
const $titleLength = document.querySelector('.current-title-length');
const $publishButton = document.querySelector('.publish-button');
const $postForm = document.querySelector('.post-form');
const $goBack = document.querySelector('.go-back');
const $imageUpload = document.querySelector('#cover-image-upload');
const $coverImage = document.querySelector('.cover-image');
const $fileReUpload = document.querySelector('.file-re-upload-wrapper');
const $imageReUpload = document.querySelector('#cover-image-re-upload');


// 입력값 길이 확인 & 글 길이 html 변경 
function checkInputLength( {target} ) {
    if (target.value && target.value.length > 30) {
        // html 내에서 maxlength로 설정 가능 
        alert('30자를 초과한 제목은 입력할 수 없습니다.');
        return;
    }
    $titleLength.innerHTML = target.value.length;
}

// 입력 form 제출 & json에 저장 
async function postSubmit(event) {
    event.preventDefault(); // 사용자 에이전트의 기본 동작을 실행 X
    // 제출할 때 새로고침을 방지하기 위해 사용 

    try {
        await fetch(`http://localhost:1234/posts`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                title: $titleInput.value,
                content: $contentInput.value,
                image: $coverImage.src,
                author: '새로운 유저',
                authorImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            })
        });
        window.location.assign('/posts.html');
    } catch (err) {
        alert(err);
    }
}

function uploadImage(event) {
    const file = event.target.files[0];
    console.log(file);
    const fileReader = new FileReader();
    // data를 URL로 
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
        $coverImage.src = event.target.result;
    }
    $coverImage.style.display = 'block';
    $fileReUpload.style.display = 'block';
    
}

$imageUpload.addEventListener('change', uploadImage);
$imageReUpload.addEventListener('change', uploadImage);

$titleInput.addEventListener('input', checkInputLength);

$postForm.addEventListener('submit', postSubmit);
$publishButton.addEventListener('click', () => {
    $postForm.dispatchEvent(new Event('submit'));
});

// 뒤로가기 버튼 클릭 시 1단계 뒤로가기
$goBack.addEventListener('click', () => {
    window.history.back(1);
});

