import markupSearch from "./markup.js";
import { currentPage } from "./pagination.js";
import "./search-input.js";
import renderTopRated from "./top-filters.js";
let totalPages;

const KEY = "6f1c32f58bd439b838f8f392fdf2c4dc";

export default function fetchMovies() {
  const langSearch = localStorage.getItem("lang");
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}&page=${currentPage}&language=${langSearch}`;

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

export function fetchGenres() {
  const langSearch = localStorage.getItem("lang");
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=${langSearch}`;
  return fetch(genreUrl)
    .then((response) => (response.status === 200 ? response.json() : ""))
    .then((data) => data.genres)
    .catch((err) => console.log(err));
}
