import loader from './loader';
import ApiService from './apiService.js';
import MovieModal from './movieModal.js';
import objectTransformations from './objectTransformations.js';
import resetRender from './resetRender';

const themeSwitch = document.querySelector('.theme-switch');

const { renderMoviesList, clearGalleryContainer } = resetRender;

const finder = new ApiService();
finder.searchType = 0;
finder.searchGenres();

/*loader = () => {
  preloader.classList.toggle('show');
};
*/
export function popularMovies() {
  clearGalleryContainer();

  finder
    .searchMovies()

    .then(({ results }) => {
      return objectTransformations(results);
    })
    .then(data => {
      finder.moviesArray = [...finder.moviesArray].concat([...data]);
      renderMoviesList(finder.moviesArray.slice(finder.pageDesktop, finder.pageDesktop + 6));
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
    })

    .catch(err => console.warn(err));
}
popularMovies();

//==============================
const paginationBack = document.querySelector('button[data-action="back"]');
const paginationForward = document.querySelector('button[data-action="forward"]');

paginationBack.addEventListener('click', paginationBackHundler);
paginationForward.addEventListener('click', paginationForwardHundler);

function paginationBackHundler() {
  if (finder.pageDesktop >= 6) {
    finder.pageDesktop -= 6;
    renderMoviesList(finder.moviesArray.slice(finder.pageDesktop, finder.pageDesktop + 6));
  }
}
function paginationForwardHundler() {
  finder.pageDesktop += 6;
  if (finder.pageDesktop + 6 < finder.moviesArray.length) {
    finder.page += 1;
    popularMovies();
  }
  renderMoviesList(finder.moviesArray.slice(finder.pageDesktop, finder.pageDesktop + 6));
}

//document.body.clientWidth
window.addEventListener('resize', function calculateElementsForOutput() {}, false);
function calculateElementsForOutput() {}
