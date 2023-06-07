// eslint-disable-next-line import/extensions
//회원가입 페이지에서 이메일 중복 확인, 입력 필드의 유효성 검사 및 회원가입 요청을 처리하는 기능을 구현합니다.
import validate from './validate.js';

const $emailInput = document.querySelector('.signup-form-email');
const $duplicateButton = document.querySelector('.signup-form-email-button');
const $signupButton = document.querySelector('.form-button');

const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

document.querySelector('.signup-form').oninput = e => {
  // 이름의 유효성을 검사하는 함수입니다.
  if (e.target.matches('#name')) {
    validate.nameValidate(e.target.value, 0, $signupButton);
  } else if (e.target.matches('#email')) {
    // 이메일의 유효성을 검사하는 함수입니다.
    validate.emailValidate(e.target.value, 1, $signupButton, false);

    $emailInput.querySelector('.icon-success').classList.add('hidden');
    $emailInput.querySelector('.icon-error').classList.remove('hidden');

    if (regEmail.test(e.target.value)) {
      // 이메일 주소가 유효하면 중복 확인 버튼을 활성화합니다.
      $duplicateButton.removeAttribute('disabled');
    } else {
      $duplicateButton.setAttribute('disabled', '');
    }
  } else if (e.target.matches('#phone')) {
    // 전화번호의 유효성을 검사하는 함수입니다.
    validate.phoneValidate(e.target.value, 2, $signupButton);
  } else if (e.target.matches('#password')) {
    // 비밀번호의 유효성을 검사하는 함수입니다.
    validate.passwordValidate(e.target.value, 3, $signupButton);
    // 비밀번호 확인의 유효성을 검사하는 함수입니다.
    validate.passwordConfirmValidate(
      e.target.value !== document.querySelector('#confirm-password').value,
      4,
      $signupButton
    );
  } else if (e.target.matches('#confirm-password')) {
    // 비밀번호 확인의 유효성을 검사하는 함수입니다.
    validate.passwordConfirmValidate(document.querySelector('#password').value !== e.target.value, 4, $signupButton);
  }
};

document.querySelector('.form-button').onclick = async e => {
  // 회원가입 버튼을 클릭할 때 실행됩니다.
  e.preventDefault();

  try {
    const { data: maxId } = await axios.get('/users');
    const newId = maxId.maxId;

    const len = document.querySelector('#password').value.length;
    // 회원가입 요청을 서버에 전송합니다.
    await axios.post('/users/signup', {
      id: newId,
      name: document.querySelector('#name').value,
      email: document.querySelector('#email').value,
      phone: document.querySelector('#phone').value,
      password: document.querySelector('#password').value,
      passwordHint:
        document.querySelector('#password').value.slice(0, 2) +
        '*'.repeat(document.querySelector('#password').value.length - 2),
    });

    alert('회원가입이 완료되었습니다.');
    window.location.href = '/signin';
  } catch (error) {
    console.error(error);
  }
};

const $checkDuplicateMessage = document.querySelector('.signup-form-email .error');

const changeText = (message, color) => {
  // 이메일 중복 확인 메시지의 내용과 색상을 변경하는 함수입니다.
  $checkDuplicateMessage.innerHTML = message;
  $checkDuplicateMessage.style.color = color;
};

$duplicateButton.onclick = async () => {
  // 중복 확인 버튼을 클릭할 때 실행됩니다.
  try {
    const emailValue = document.querySelector('#email').value;
    // 서버에 이메일 중복 확인 요청을 전송합니다.
    const res = await axios.get(`/users/email/${emailValue}`);
    const { isDuplicate } = res.data;

    if (isDuplicate) {
      // 이메일이 이미 존재하는 경우
      changeText('이미 존재하는 이메일 입니다.', '#ed2553');
    } else {
      // 이메일이 사용 가능한 경우
      changeText('사용 가능한 이메일 입니다.', '#2196f3');
      $emailInput.querySelector('.icon-error').classList.add('hidden');
      $emailInput.querySelector('.icon-success').classList.remove('hidden');
      validate.emailValidate(emailValue, 1, $signupButton);
    }
  } catch (error) {
    console.error(error);
  }
};
