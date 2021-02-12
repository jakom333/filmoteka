import "./styles.css";
import fetchMovies from "../src/js/fetchMovies.js";
import "./js/header/header.js";
import { fetchGenres } from "./js/fetchMovies.js";

export let genres = [];

fetchGenres().then((res) => {
  genres = res;
  fetchMovies();
});
