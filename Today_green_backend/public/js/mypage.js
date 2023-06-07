//render 함수는 페이지가 로드될 때 실행되도록 window.onload 이벤트에 할당됩니다.
const render = (() => {
  window.onload = async () => {
    try {
      // axios를 사용하여 비동기적으로 /checkAuth 엔드포인트로 GET 요청을 보냅니다.
      // 이 엔드포인트는 현재 사용자의 인증 상태를 확인하는 용도로 사용될 수 있습니다.
      const { data: user } = await axios.get('/checkAuth');

      if (user) {
        // 사용자가 로그인되어 있는 경우, 사용자 정보를 가져와서 마이페이지의 입력 필드에 값을 할당합니다.
        document.querySelector('.mypage-form-email > input').value = user.email;
        document.querySelector('.mypage-form-name > input').value = user.name;
        document.querySelector('.mypage-form-phone > input').value = user.phone;
      }
    } catch (e) {
      // 예외가 발생하면 콘솔에 오류 메시지를 출력합니다.
      console.error(e);
    }
  };
})();
// "프로필 편집" 버튼이 클릭되었을 때, "/mypage_edit" 페이지로 이동합니다.
document.querySelector('.edit-profile-button').onclick = () => {
  window.location.href = '/mypage_edit';
};
// "뒤로 가기" 버튼이 클릭되었을 때, 이를 통해 사용자를 로그아웃시키는 작업을 수행합니다.
document.querySelector('.form-back').onclick = async () => {
  try {
    //로그아웃 요청이 성공적으로 처리되면 HTTP 응답 상태 코드가 204인지 확인한 후, "/signin" 페이지로 이동합니다.
    const check = await axios.get('/users/logout');
    if (check.status === 204) window.location.href = '/signin';
  } catch (e) {
    //예외가 발생하면 콘솔에 오류 메시지를 표시합니다.
    console.error(e);
  }
};
