import "./styles.css";
import fetchMovies from "../src/js/fetchMovies.js";
import "./js/header/header.js";
import { fetchGenres } from "./js/fetchMovies.js";
import "./js/pagination.js";
import "./js/spinner.js";
import "./js/search-input.js";

/* * ------------- modal-window ---------------- */
import modalWindowTpl from "./templates/modal-window.hbs";

const filmsList = document.querySelector(".photo-gallery-list");
let film_ID;
const modalWindow = document.querySelector(".modal-window");

// const overlay = document.querySelector(".modalWindow-overlay");
// const closeModalBtn = document.querySelector(
//   'button[data-action="close-lightbox"]',
// );

filmsList.addEventListener("click", onOpenModal);
// overlay.addEventListener("click", onOverlayClick);
// closeModalBtn.addEventListener("click", onCloseModal);

function onOpenModal(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const filmRef = event.target;
  film_ID = filmRef.dataset.id;

  const KEY = "8c70e92845ff03879b2dd3fe0ba57aa8";
  let movieIUrl = `https://api.themoviedb.org/3/movie/${film_ID}?api_key=${KEY}&language=en-US`;

  function fetchFilmInfo() {
    return fetch(movieIUrl)
      .then((response) => response.json())
      .then((data) => {
        return modalMarkup(data);
      })
      .catch((err) => console.log(err));
  }
  fetchFilmInfo(film_ID);
}

function modalMarkup(data) {
  const markup = modalWindowTpl(data);
  modalWindow.insertAdjacentHTML("afterbegin", markup);

  console.log(modalWindow);

  // window.addEventListener("keydown", onPressKey);
  modalWindow.classList.add("is-open");
}

// function onPressKey(event) {
//   if (event.code === "Escape") onCloseModal();
// }

// function onCloseModal() {
//   window.removeEventListener("keydown", onPressKey);
//   modalWindow.classList.remove("is-open");
//   // fetch() -  перерисовать страницу?
// }

// function onOverlayClick(event) {
//   if (event.target === event.currentTarget) {
//     onCloseModal();
//   }
// }
export let genres = [];

fetchGenres().then((res) => {
  genres = res;
  fetchMovies();
});
