import markupSearch from "./markup.js";
import { currentPage } from "./pagination";

const KEY = "6f1c32f58bd439b838f8f392fdf2c4dc";

export default function fetchMovies() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}&page=${currentPage}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => markupSearch(data))
    .catch((err) => console.log(err));
}

export function fetchGenres() {
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`;
  return fetch(genreUrl)
    .then((response) => (response.status === 200 ? response.json() : ""))
    .then((data) => data.genres)
    .catch((err) => console.log(err));
}
