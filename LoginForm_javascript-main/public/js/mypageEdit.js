// import { hash } from 'bcrypt';
import validate from './validate.js';
// const bcrypt = require('bcrypt');

const $completeButton = document.querySelector('.complete-button');
const $email = document.querySelector('.mypage-form-email > input');
const $name = document.querySelector('.mypage-form-name > input');
const $phone = document.querySelector('.mypage-form-phone > input');
const $password = document.querySelector('.mypage-form-password > input');
const $confirmPwd = document.querySelector('#confirm-password');

let nowUserId;
// let nowUserPassword;

// 페이지 로드 시 실행됩니다.
window.onload = async () => {
  try {
    // '/checkAuth' 엔드포인트로 GET 요청을 보내서 사용자 데이터를 가져옵니다.
    const { data: user } = await axios.get('/checkAuth');

    // 입력 필드를 사용자 데이터로 채웁니다.
    $email.value = user.email;
    $name.value = user.name;
    $phone.value = user.phone;

    nowUserId = user.id;
    // nowUserPassword = user.password;
  } catch (e) {
    console.error(e);
  }
};

const INPUT_NAME_INDEX = 0;
const INPUT_PHONE_INDEX = 1;
const INPUT_PASSWORD_INDEX = 2;
const INPUT_CONFIRM_PASSWORD_INDEX = 3;

// 마이페이지 폼의 입력 변화를 처리합니다.
document.querySelector('.mypage-form').oninput = e => {
  if (e.target.matches('#name')) {
    // 이름 유효성 검사를 수행하고 완료 버튼을 활성화/비활성화합니다.
    validate.nameValidate(e.target.value, INPUT_NAME_INDEX, $completeButton);
  } else if (e.target.matches('#phone')) {
    // 전화번호 유효성 검사를 수행하고 완료 버튼을 활성화/비활성화합니다.
    validate.phoneValidate(e.target.value, INPUT_PHONE_INDEX, $completeButton);
  } else if (e.target.matches('#password')) {
    // 비밀번호 유효성 검사를 수행하고 완료 버튼을 활성화/비활성화합니다.
    validate.passwordValidate(e.target.value, INPUT_PASSWORD_INDEX, $completeButton);

    const check = $password.parentNode.lastElementChild.textContent === '';
    if ($confirmPwd.value !== '') {
      // 비밀번호 확인 유효성 검사를 수행하고 완료 버튼을 활성화/비활성화합니다.
      validate.passwordConfirmValidate(
        !(check && $password.value === $confirmPwd.value),
        INPUT_CONFIRM_PASSWORD_INDEX,
        $completeButton
      );
    }
  } else if (e.target.matches('#confirm-password')) {
    const check = $password.parentNode.lastElementChild.textContent === '';
    // 비밀번호 확인 유효성 검사를 수행하고 완료 버튼을 활성화/비활성화합니다.
    validate.passwordConfirmValidate(
      !(check && $password.value === $confirmPwd.value),
      INPUT_CONFIRM_PASSWORD_INDEX,
      $completeButton
    );
  }
};

// 완료 버튼 클릭 이벤트를 처리합니다.
$completeButton.onclick = async e => {
  e.preventDefault();
  try {
    // 사용자 정보를 업데이트하기 위해 PATCH 요청을 보냅니다.
    await axios.patch(`/users/${nowUserId}`, {
      name: $name.value,
      phone: $phone.value,
      password: $password.value,
    });

    // 마이페이지로 리디렉션합니다.
    window.location.href = '/mypage';
  } catch (e) {
    console.error(e);
  }
};

const $modal = document.querySelector('.popup');
const $modalError = $modal.querySelector('.error');
const $modalInput = $modal.querySelector('input');

// 팝업을 열고 닫는 함수를 정의합니다.
const popupHandle = () => {
  document.querySelector('.cover').classList.toggle('hidden');
  $modal.classList.toggle('hidden');
  $modalError.textContent = '';
  $modalInput.value = '';
};

// 탈퇴 버튼 클릭 이벤트를 처리합니다.
document.querySelector('.withdraw-button').onclick = () => {
  popupHandle();
};

//취소 버튼 클릭 이벤트를 처리합니다.
document.querySelector('.cancle-button').onclick = () => {
  popupHandle();
};

// 폼 제출 이벤트를 처리합니다.
document.querySelector('form').onsubmit = async e => {
  e.preventDefault();

  try {
    // 사용자 계정 삭제를 위해 POST 요청을 보냅니다.
    const check = await axios.post(`/users/${nowUserId}`, {
      checkPassword: document.querySelector('.delete-password').value,
    });

    if (check.status === 204) {
      // 삭제가 성공적으로 이루어지면 성공 메시지를 표시하고 로그인 페이지로 리디렉션합니다.
      alert('계정이 정상적으로 삭제되었습니다.');
      window.location.href = '/signin';
    } else if (check.status === 202) {
      // 비밀번호가 일치하지 않을 경우 오류 메시지를 표시합니다.
      alert('비밀번호가 일치하지 않습니다.');
    }
  } catch (e) {
    console.error(e);
  }
};

// 뒤로 가기 버튼 클릭 이벤트를 처리합니다.
document.querySelector('.form-back').onclick = () => (window.location.href = '/mypage');
