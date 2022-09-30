export default class ApiService {
  constructor() {
    this.query = '';
    this.page = 1;
    this.searchIndex = 3;
    this.totalResultsFound = 0;
    this.totalPagesFound = 0;
    this.key = '0d09eb187785fad1be6a14878e771552';
    this.moviesUrls = [];
    this.moviesArray = [];
    this.pageDesktop = 0;
    // this.language = '';
  }

  defineUrls(language) {
    //метод задает массив из 3 url - для разных вариантов запроса - популярное, по слову, по ИД
    this.moviesUrls = [
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.key}&language=${language}&page=${this.page}&include_adult=false`,
      `https://api.themoviedb.org/3/search/movie?api_key=${this.key}&language=${language}&query=${this.query}&page=${this.page}&include_adult=false`,
      `https://api.themoviedb.org/3/movie/${this.query}?api_key=${this.key}&language=${language}&page=${this.page}&include_adult=false`,
      `https://api.themoviedb.org/3/discover/movie?api_key=${this.key}&language=${language}&with_genres=${this.query}&page=${this.page}`,
    ];
  }

  searchMovies() {
    this.defineUrls(localStorage.getItem('language') || 'en-US');
    let url = this.moviesUrls[this.searchIndex];
    // console.log(url);
    // console.log('language:', this.language);

    return fetch(url)
      .then(response => response.json())

      .catch(err => console.log(err));
  }
  searchGenres() {
    const language = localStorage.getItem('language') || 'en-US';
    //тут жестко заданный url, т.к. подгрузка жанров осуществляется без запросов пользователя, один раз,в самом начале работы
    return fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=${language}`,
    )
      .then(response => response.json())
      .then(res => {
        return res;
      })
      .then(data => localStorage.setItem('Genres', JSON.stringify(data.genres)))
      .catch(err => console.log(err));
  }
}
