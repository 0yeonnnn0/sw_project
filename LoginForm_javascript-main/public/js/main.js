//window.onload 함수는 페이지가 완전히 로드된 후에 실행됩니다.
//이 함수는 페이지의 모든 요소가 로드되고 준비된 후에 코드를 실행할 수 있도록 합니다.
window.onload = async () => {
  try {
    // axios를 사용하여 비동기적으로 /checkAuth 엔드포인트로 GET 요청을 보냅니다.
    // 이 엔드포인트는 현재 사용자의 인증 상태를 확인하는 용도로 사용될 수 있습니다.
    const user = await axios.get('/checkAuth');
    // if 문을 사용하여 user 변수가 존재하는 경우, 즉 인증된 사용자가 있는 경우에는
    // window.location.href를 사용하여 페이지를 "/mypage"로 이동시킵니다.
    // 이는 사용자가 이미 로그인되어 있는 경우에는 자동으로 마이페이지로 리디렉션됨을 의미합니다.
    if (user) window.location.href = '/mypage';
  } catch (e) {
    // catch 블록은 예외가 발생한 경우를 처리합니다.
    // 예외가 발생하면 콘솔에 오류 메시지를 출력합니다.
    console.error(e);
  }
};
//페이지가 로드되었을 때 실행되어 로그인 여부를 확인하고, 로그인된 사용자가 있다면 "/mypage"로 페이지를 이동시키는 기능을 구현합니다.