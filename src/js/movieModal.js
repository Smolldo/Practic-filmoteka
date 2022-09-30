import { async } from '@firebase/util';
import movieModal from '../templates/movie-modal.hbs';
import { user } from './auth';
import { toggleModal } from './open-modal-login';
import { readFromFBHundler, writeToFBHundler } from './read-write-to-firebase';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//========================================================
const themeSwitch = document.querySelector('.theme-switch');
//=====================================================

export default class MovieModal {
  constructor(movie) {
    this.markup = movieModal(movie);
    this.refs;
    this.object = movie;
  }

  appendMarkup() {
    document.body.insertAdjacentHTML('beforeend', this.markup);
  }

  getRefs() {
    this.refs = {
      closeBtn: document.querySelector('[data-close]'),
      modal: document.querySelector('[data-movieModal]'),
      watchedBtn: document.querySelector('[data-addToWatched]'),
      queueBtn: document.querySelector('[data-addToQueue]'),
    };
  }

  addEventListeners() {
    this.refs.closeBtn.addEventListener('click', () => {
      themeSwitch.classList.remove('visualy-hidden');
      this.closeModal();
    });

    this.refs.modal.addEventListener('click', e => {
      if (e.target === e.currentTarget) this.closeModal();
      themeSwitch.classList.remove('visualy-hidden');
    });

    //======================   write to Firebase if user is login ========================
    this.refs.watchedBtn.addEventListener('click', () => {
      if (!user.isLogin) {
        toggleModal();
        return;
      }
      //============check on existence in FB========================
      checkForExistence('watched', this.object).then(response => {
        if (response === true) {
          Notify.failure('This movie has already been added');
        }
        if (response === false) {
          writeToFBHundler('watched', this.object);
          Notify.success('Successfuly added');
        }
      });
    });

    //======================   write to Firebase if user is login ========================
    this.refs.queueBtn.addEventListener('click', () => {
      if (!user.isLogin) {
        toggleModal();
        return;
      }
      //============check on existence in FB========================
      checkForExistence('queue', this.object).then(response => {
        if (response === true) {
          Notify.failure('This movie has already been added');
        }
        if (response === false) {
          writeToFBHundler('queue', this.object);
          Notify.success('Successfuly added');
        }
      });
    });
  }

  closeModal() {
    this.refs.modal.remove();
  }
}

async function checkForExistence(nameCollection, obj) {
  return await readFromFBHundler(nameCollection).then(data => {
    return data.some(item => item.imdb_id === obj.imdb_id);
  });
}
