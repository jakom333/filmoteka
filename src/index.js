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
import "./js/buttons-movie";
import refs from './js/refs.js';

export let genres =  [];

let lang = localStorage.getItem('lang');
let activeLang;
if (lang === 'en-EN') {
  activeLang = refs.switcher.querySelector('.underline');
  activeLang.classList.remove('underline');
  refs.enBtn.classList.add('underline');

}  else if (lang === 'ru-RU'){
  activeLang = refs.switcher.querySelector('.underline');
  activeLang.classList.remove('underline');
  refs.ruBtn.classList.add('underline');
}

fetchGenres(lang).then((res) => {
  genres = res;
  localStorage.setItem('genres', JSON.stringify(genres));
  fetchMovies();
});

