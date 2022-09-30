import filmsTpl from '../templates/search-card.hbs';
import debounce from 'lodash.debounce';
import VideoApiService from './apiServiceSearch';
import MovieModal from './movieModal';
import { vars } from './variables';

const themeSwitch = document.querySelector('.theme-switch');
const refs = vars;
const filmApiService = new VideoApiService();

refs.input.addEventListener(
  'input',
  debounce(e => {
    onSearch(e);
  }, 1000),
);

function onSearch(e) {
  e.preventDefault();
  onClear();
  filmApiService.query = e.target.value;
  filmApiService.pageNum = 1;
  refs.main.classList.add('is-hidden');
  refs.errorMessage.classList.add('is-hidden');
  if (filmApiService.query === '') {
    refs.main.classList.remove('is-hidden');
    return;
  }

  filmApiService
    .insertGenresToSearch()
    .then(data => {
      if (!data) {
        return;
      } else {
        if (data.length === 0) {
          onFetchError();
        } else {
          if (data.length < 20) {
            renderFilmsList(data);
            moidalCreate();
          } else {
            renderFilmsList(data);
            moidalCreate();
            fetchDataOfSearchFilms();
          }
        }
      }
    })
    .catch(err => {
      onFetchError(err);
    });
}

function renderFilmsList(list) {
  const markUp = filmsTpl(list.slice(0, 6));
  refs.gallery.innerHTML = markUp;
}

function onClear() {
  refs.gallery.innerHTML = ' ';
}

function onFetchError() {
  refs.errorMessage.classList.remove('is-hidden');
}

function moidalCreate() {
  const galleryRefs = document.querySelectorAll('.gallery__list');
  galleryRefs.forEach(el => {
    el.addEventListener('click', () => {
      themeSwitch.classList.add('visualy-hidden');
      fetch(
        `https://api.themoviedb.org/3/movie/${el.id}?api_key=0d09eb187785fad1be6a14878e771552&language=en-US`,
      )
        .then(response => response.json())
        .then(response => {
          const info = new MovieModal(response);
          info.appendMarkup();
          info.getRefs();
          info.addEventListeners();
        });
    });
  });
}
