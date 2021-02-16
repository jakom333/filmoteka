import "./styles.css";
import "./js/header/header.js";
import fetchMovies from "../src/js/fetchMovies.js";
import { fetchGenres } from "./js/fetchMovies.js";
import "./js/pagination.js";
import "./js/spinner.js";
import "./js/search-input.js";
import "./js/modal-window.js";
import "./js/switch-language.js";
import "./js/top-filters.js";
import "./js/localstorage/localstorage.js";
import "./js/markup-library.js";
import "./js/markup.js";

export let genres = [];

fetchGenres().then((res) => {
  genres = res;
  fetchMovies();
});
