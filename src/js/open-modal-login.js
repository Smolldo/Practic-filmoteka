/*----------open modal LogIN------------*/

export const modalForm = {
  LogInBtn: document.querySelector('button[data-action="login"]'),
  LogOutBtn: document.querySelector('button[data-action="loguot"]'),

  closeModalBtn: document.querySelector('.btn__close'),
  backdrop: document.querySelector('.backdrop'),
  popup: document.querySelector('.popup'),
  linkToSignup: document.querySelector('.to_signup'),
  linkToForgotPass: document.querySelector('.to_change-pass'),
  btnLoginSubmit: document.querySelector('.modal-login__form .btn__submit'),
  btnSignupSubmit: document.querySelector('.modal-signup__form .btn__submit'),
  formLogin: document.querySelector('.modal-login__form'),
  formSignup: document.querySelector('.modal-signup__form'),
  infoMessageStrLogin: document.querySelector('.modal-login__form .message'),
  infoMessageStrSignup: document.querySelector('.modal-signup__form .message'),
  userEmail: document.querySelector('.user__name'),

  clearForm() {
    this.formLogin.reset();
    this.formSignup.reset();
    this.btnLoginSubmit.disabled = false;
    this.btnSignupSubmit.disabled = false;
    this.infoMessageStrLogin.innerHTML = '';
    this.infoMessageStrSignup.innerHTML = '';
  },
};

modalForm.LogInBtn.addEventListener('click', toggleModal);
modalForm.closeModalBtn.addEventListener('click', toggleModal);
modalForm.linkToSignup.addEventListener('click', toggleForm);

export function toggleModal() {
  modalForm.clearForm();
  modalForm.backdrop.classList.toggle('is-hidden');
  modalForm.popup.querySelector('.modal-login__form').classList.add('active');
  modalForm.popup.querySelector('.modal-signup__form').classList.remove('active');
}
function toggleForm() {
  modalForm.clearForm();
  modalForm.popup.querySelector('.modal-login__form').classList.remove('active');
  modalForm.popup.querySelector('.modal-signup__form').classList.add('active');
}
