// eslint-disable-next-line import/extensions
import validate from './validate.js';

const $formButton = document.querySelector('.form-button');
const $findPassword = document.querySelector('.find-password');
const $deleteButton = document.querySelector('.delete-button');

//로그인 양식의 입력 이벤트를 처리합니다.
document.querySelector('.signin-form').oninput = e => {
  if (e.target.matches('#email')) {
    // 이 함수는 이메일 주소의 유효성을 검사합니다.
    validate.emailValidate(e.target.value, 0, $formButton);
  } else if (e.target.matches('#password')) {
    //비밀번호의 유효성을 검사합니다.
    validate.passwordValidate(e.target.value, 1, $formButton);
  }
};
//자동 로그인 확인란의 상태를 나타냅니다.
let checked = false;
//자동 로그인 확인란의 선택 상태를 변경할 때마다 실행, 변경된 상태를 저장합니다.
document.querySelector('#auto__login').onchange = () => {
  checked = !checked;
};
//로그인 버튼을 클릭할 때마다 실행됩니다.
$formButton.onclick = async e => {
  //페이지의 기본 동작을 중지합니다.
  e.preventDefault();

  //서버에 로그인 정보를 전송합니다.
  try {
    //서버에서 응답을 저장합니다.
    const { data: user } = await axios.post('/signin', {
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value,
      autoLogin: checked,
    });
    //로그인에 성공했으면 마이페이지로 이동합니다.
    if (user) window.location.href = '/mypage';
  } catch (error) {
    //로그인에 실패했을 시 로그인 오류 메시지를 표시하고 오류메시지를 콘솔에 표시합니다.
    document.querySelector('.singin-error-login').innerHTML = '아이디 또는 비밀번호가 잘못 입력 되었습니다.';
    console.error(error);
  }
};

const $modal = document.querySelector('.popup');
//팝업 창을 표시합니다.
const popupHandle = () => {
  document.querySelector('.cover').classList.toggle('hidden');
  $modal.classList.toggle('hidden');
  $modal.querySelector('.error').textContent = '';
  $findPassword.value = '';
  $deleteButton.setAttribute('disabled', '');
};

document.querySelector('.find').onclick = e => {
  // 비밀번호 찾기 버튼을 클릭할 때 실행됩니다.
  e.preventDefault();
  popupHandle();
};

$modal.querySelector('.cancle-button').onclick = () => {
  // 팝업 창의 취소 버튼을 클릭할 때 실행됩니다.
  popupHandle();
};

document.querySelector('.signin-form-more').onclick = e => {
  if (!e.target.matches('a')) return;
//회원가입 페이지로 이동합니다.
  window.location.href = '/signup';
};

const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
$findPassword.oninput = e => {
  if (regEmail.test(e.target.value)) {
    // 이메일 주소가 유효하면 삭제 버튼을 활성화합니다.
    $deleteButton.removeAttribute('disabled');
  } else {
    $deleteButton.setAttribute('disabled', '');
  }
};

const checkPassword = async () => {
  try {
    // 서버에 비밀번호를 확인하기 위한 요청을 전송합니다.
    const findPassword = $findPassword.value;
    const res = await axios.get(`/user/find/${findPassword}`);
    document.querySelector('.popup .error').innerHTML = '';
    $findPassword.value = res.data;
  } catch (error) {
    console.error(error);
    document.querySelector('.popup .error').innerHTML = '존재하지 않는 이메일 입니다.';
  }
};

document.querySelector('.popup-button').onclick = async e => {
  // 팝업 창의 확인 버튼을 클릭할 때 실행됩니다.
  e.preventDefault();
  await checkPassword();
};

document.querySelector('.popup-form').onsubmit = async e => {
  // 비밀번호 찾기 폼을 제출할 때 실행됩니다.
  e.preventDefault();
  await checkPassword();
  $findPassword.blur();
};
