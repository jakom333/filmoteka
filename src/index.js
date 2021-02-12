import "./styles.css";
import fetchMovies from "../src/js/fetchMovies.js";
import { fetchGenres } from "./js/fetchMovies.js";

export let genres = [];

fetchGenres().then((res) => {
  genres = res;
  fetchMovies();
});
