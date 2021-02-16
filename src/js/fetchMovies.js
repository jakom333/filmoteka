import markupSearch from "./markup.js";
import { currentPage } from "./pagination";
import './search-input.js';
import renderTopRated from './top-filters.js';
import config from '../data-base//config.json';

export default function fetchMovies() {
  const lang = localStorage.getItem('lang');
  const url = `${config.baseURL}trending/movie/day?api_key=${config.KEY}&page=${currentPage}&language=${lang}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      renderTopRated(data);
      markupSearch(data);
      document.querySelector(".btn-last").textContent = data.total_pages;
      document.querySelector(".btn-last").dataset.index = data.total_pages;
      return (totalPages = data.total_pages);
    })
    .catch((err) => console.log(err));
}

export function fetchGenres(lang) {
const genreUrl = `${config.baseURL}genre/movie/list?api_key=${config.KEY}&language=${lang}`;
  return fetch(genreUrl)
    .then((response) => (response.status === 200 ? response.json() : ""))
    .then((data) => {
    localStorage.setItem('genres', JSON.stringify(data.genres));
    return data.genres
    })
    .catch((err) => console.log(err));
}
