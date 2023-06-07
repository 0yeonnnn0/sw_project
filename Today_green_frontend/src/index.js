const $sidebarToggleButton = document.querySelector(".side-bar-toggle");
const $sidebar = document.querySelector('.side-bar');
const $backDrop = document.querySelector('.back-drop');

// btn 클릭 시 sidebar class에 'open'이 있으면 삭제, 없으면 생성 => sidebar 보이게
$sidebarToggleButton.addEventListener('click', () => {
    //사이드바 표시 / 숨김
    $sidebar.classList.toggle('open'); 
    //sidebar 보이게
    $backDrop.style.display = 'block';
});

// backdrop 클릭 시 sidebar 사라짐
$backDrop.addEventListener('click', () => {
    //이는 사이드바를 숨깁니다.
    $sidebar.classList.toggle('open'); 
    //sidebar 보이지 않게
    $backDrop.style.display = 'none';
});
