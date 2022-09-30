
//is-none: display: none
//is-visible: opacity:0

import { vars } from "./variables";

// film search button
const Search = () => {
  if (vars.seearchInput.value === '') {
    vars.errorText.classList.remove('is-visible');
  } else {
    vars.errorText.classList.add('is-visible');
  }
}
vars.searchBtn.addEventListener('click', Search);

//go to library button
const ToLibrary = () => {
  vars.headerBg.classList.add('cabinet-open');
  vars.headerBg.classList.remove('home-open');

  vars.libraryBlock.classList.remove('is-none');
  vars.homeBlock.classList.add('is-none');
  vars.libraryBtn.classList.add('current');
  vars.homeBtn.classList.remove('current');
}
vars.libraryBtn.addEventListener('click', ToLibrary);

//back to home button
const ToHome = () => {
  vars.headerBg.classList.add('home-open');
  vars.headerBg.classList.remove('cabinet-open');

  vars.libraryBlock.classList.add('is-none');
  vars.homeBlock.classList.remove('is-none');
  vars.libraryBtn.classList.remove('current');
  vars.homeBtn.classList.add('current');
location.reload();				  
}
vars.homeBtn.addEventListener('click', ToHome);
vars.logolink.addEventListener('click', ToHome);



