import "./styles.css";
import fetchMovies from "../src/js/fetchMovies.js";
import { fetchGenres } from "./js/fetchMovies.js";
import searchQuery from './js/search-input.js';

export let genres = [];

fetchGenres().then((res) => {
  genres = res;
  fetchMovies();
});
