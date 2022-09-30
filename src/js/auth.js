import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { User } from './user-class';
import { modalForm } from './open-modal-login';

// =================Initialize Firebase=========================
const firebaseConfig = {
  apiKey: "AIzaSyB_go43E_mkMNt3Ec-DQW-57Yak-IY7fgg",
  authDomain: "practic-bc31f.firebaseapp.com",
  projectId: "practic-bc31f",
  storageBucket: "practic-bc31f.appspot.com",
  messagingSenderId: "238590183504",
  appId: "1:238590183504:web:8a9a5a643c1ba289ce2955",
  measurementId: "G-N43FCNC960"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//===============================================================

let isLoginFormActive = true;

export const user = new User();
checkOnActiveUser();

function checkOnActiveUser() {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (userData) {
    user.userLogin(userData.user.email, userData.user.id, userData.user.idLocal);
    changeStatusUserOnPage();
  }
}

modalForm.clearForm(); //reset form elements
//=====================================================================

modalForm.formLogin.addEventListener('submit', logInUserHandler);
modalForm.formSignup.addEventListener('submit', registrationNewUserHandler);
modalForm.linkToForgotPass.addEventListener('click', () =>
  renderMessage(`<p class='success'>Check your email and follow the instruction in letter</p>`),
);

modalForm.LogOutBtn.addEventListener('click', () => {
  user.userLogout();
  changeStatusUserOnPage();
  localStorage.removeItem('user');
});

//=====================================================================================

/*--------- event submit 'logIn-form ----------*/
function logInUserHandler(event) {
  event.preventDefault();
  isLoginFormActive = true;
  if (user.isLogin) {
    renderMessage(`<p class='error'>You are LogIn! Please LogOut and try again.</p>`);
    return;
  }
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;
  authWithEmailAndPassword(email, password).then(isIdToken);
}

/*--------- fetch-login to Firebase ------------*/
function authWithEmailAndPassword(email, password) {
  const apiKey = firebaseConfig.apiKey;
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response.json())
    .catch(error => console.log(error));
}

//=====================================================================================

/*--------- event submit 'SignUp-form ----------*/
function registrationNewUserHandler(event) {
  event.preventDefault();
  isLoginFormActive = false;
  if (user.isLogin) {
    renderMessage(`<p class='error'>You are LogIn! Please LogOut and try again.</p>`);
    return;
  }
  const email = event.target.querySelector('#email').value;
  const passwordOne = event.target.querySelector('.password-one').value;
  const passwordTwo = event.target.querySelector('.password-two').value;

  if (passwordTwo.length < 6) {
    renderMessage(`<p class='error'>Password too short. Try again!</p>`);
    return;
  }
  if (passwordOne !== passwordTwo) {
    renderMessage(`<p class='error'>Invalid repeat password. Try again!</p>`);
    return;
  }
  user.email = email;
  RegistrationWithEmailAndPassword(email, passwordOne).then(isIdToken);
}

/*-------- fetch-signup to Firebase ------------*/
function RegistrationWithEmailAndPassword(email, password) {
  const apiKey = firebaseConfig.apiKey;

  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({ email, password, returnSecureToken: true }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .catch(error => console.log(error));
}
//=======================================================================================
//
//==========other Functions=============================================================
function isIdToken(data) {
  if (!data.idToken) {
    renderMessage(`<p class='error'>Invalid email or password, try again</p>`);
    console.log(data.error.message);
    return;
  }
  user.userLogin(data.email, data.idToken, data.localId);
  localStorage.setItem('user', JSON.stringify({ user }));
  modalForm.clearForm();
  renderMessage(`<p class='success'>You are successfuly logged in!</p>`);
  changeStatusUserOnPage();
}

/*--------- render Info-message about results to form ----------------*/
function renderMessage(message) {
  if (isLoginFormActive) {
    return (document.querySelector('.modal-login__form .form__element.message').innerHTML =
      message);
  } else {
    return (document.querySelector('.modal-signup__form .form__element.message').innerHTML =
      message);
  }
}

/* update new markup in header when User  Login/LogOut*/
function changeStatusUserOnPage() {
  modalForm.LogInBtn.classList.toggle('is-none');
  modalForm.userEmail.textContent = `${user.email}`;
  modalForm.LogOutBtn.classList.toggle('is-none');
}
