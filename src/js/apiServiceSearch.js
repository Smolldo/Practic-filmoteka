const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '282b076a53f47de1cdb41a3679f3fb05';

export default class VideoApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchVideo() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } finally { }
  }
  async fetchFilmsPagesQ() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    const response = await fetch(url);
    return await response.json();
  }

  async fetchGenresF() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    const response = await fetch(url);
    const { genres } = await response.json();
    return genres;
  }

  async insertGenresToSearch() {
    const data = await this.fetchVideo();
    const genresList = await this.fetchGenresF();
    return data.map((movie) => ({
      ...movie,
      release_date: movie.release_date
        ? movie.release_date.slice(0, 4)
        : '',
      first_air_date: movie.first_air_date
        ? movie.first_air_date.slice(0, 4)
        : '',
      genres: movie.genre_ids
        ? movie.genre_ids
          .map((id) => genresList.filter((el) => el.id === id))
          .slice(0, 2)
          .flat()
        : 'watch the movie and decide',
    }));
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  get pageNum() {
    return this.page;
  }
  set pageNum(newPage) {
    this.page = newPage;
  }
}
