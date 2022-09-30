export default class ApiService {
  constructor() {
    this.query = '';
    this.page = 1;
    this.searchIndex = 3;
    this.totalResultsFound = 0;
    this.totalPagesFound = 0;
    this.key = '282b076a53f47de1cdb41a3679f3fb05';
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

  async searchMovies() {
    this.defineUrls(localStorage.getItem('language') || 'en-US');
    let url = this.moviesUrls[this.searchIndex];
    // console.log(url);
    // console.log('language:', this.language);

    try {
      const response = await fetch(url);
      return await response.json();
    } catch (err) {
      return console.log(err);
    }
  }
  async searchGenres() {
    const language = localStorage.getItem('language') || 'en-US';
    //тут жестко заданный url, т.к. подгрузка жанров осуществляется без запросов пользователя, один раз,в самом начале работы
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=${language}`);
      const res = await response.json();
      const data = res;
      return localStorage.setItem('Genres', JSON.stringify(data.genres));
    } catch (err) {
      return console.log(err);
    }
  }
}
