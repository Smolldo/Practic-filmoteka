import moviesList from '../templates/main-cards.hbs';
import libraryList from '../templates/library-cards.hbs';

const galleryList = document.getElementById('gallery');

function renderMoviesList(movie) {
  const markup = moviesList(movie);
  galleryList.innerHTML = markup;
}

function renderLibraryList(movie) {
  const markup = libraryList(movie);
  galleryList.innerHTML = markup;
}

function clearGalleryContainer() {
  galleryList.innerHTML = '';
}

export default { renderMoviesList, clearGalleryContainer, renderLibraryList };
