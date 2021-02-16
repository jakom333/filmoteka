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
import { translateHTMLtext } from './js/switch-language.js';



let lang = localStorage.getItem('lang');
let activeLang;

if (lang === 'en-EN') {
  activeLang = refs.switcher.querySelector('.circle-color');
  activeLang.classList.remove('circle-color');
  refs.enBtn.classList.add('circle-color');
  translateHTMLtext('EN');

}  else if (lang === 'ru-RU'){
  activeLang = refs.switcher.querySelector('.circle-color');
  activeLang.classList.remove('circle-color');
  refs.ruBtn.classList.add('circle-color');
  translateHTMLtext('RU');
}

export let genres =  [];

fetchGenres(lang).then((res) => {
  genres = res;
  localStorage.setItem('genres', JSON.stringify(genres));
  fetchMovies();
});



// let localStorageLang = localStorage.getItem("lang");
// let activeLang;

// if (localStorageLang === "en-EN") {
//   activeLang = refs.switcher.querySelector(".circle-color");
//   activeLang.classList.remove("circle-color");
//   refs.enBtn.classList.add("circle-color");
// } else if (localStorageLang === "ru-RU") {
//   activeLang = refs.switcher.querySelector(".circle-color");
//   activeLang.classList.remove("circle-color");
//   refs.ruBtn.classList.add("circle-color");
// }