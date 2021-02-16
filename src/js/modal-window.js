import { playTrailer } from "./trailer.js";
import modalWindowTpl from "../templates/modal-window.hbs";
import watchedHandler from "../js/localstorage/localstorage.js";
import { isHomeScreen } from "../js/markup-library.js";
import { markupLibrary } from "../js/markup-library.js";

const filmsList = document.querySelector(".photo-gallery-list");
let film_ID;

const modalWindow = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const overlay = document.querySelector(".modal-overlay");

filmsList.addEventListener("click", onOpenModal);
overlay.addEventListener("click", onOverlayClick);

function onOpenModal(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const filmRef = event.target;
  film_ID = filmRef.dataset.id;

  const KEY = "8c70e92845ff03879b2dd3fe0ba57aa8";
  let langSearch = localStorage.getItem("lang");
  let movieIUrl = `https://api.themoviedb.org/3/movie/${film_ID}?api_key=${KEY}&language=${langSearch}`;

  function fetchFilmInfo() {
    return fetch(movieIUrl)
      .then((response) => (response.status === 200 ? response.json() : ""))
      .then((data) => {
        langSearch = langSearch === "ru-RU" ? false : true;
        console.log(data);
        modalMarkup({ ...data, langSearch });
        playTrailer();
      })
      .catch((err) => console.log(err));
  }
  fetchFilmInfo(film_ID);
}

function modalMarkup(data) {
  modalWindow.classList.remove("is-hidden");

  window.scrollTo({
    // ! may be to delete ?
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  const markup = modalWindowTpl(data);
  modalContent.insertAdjacentHTML("beforeend", markup);

  const closeModalBtn = document.querySelector(".modal-button");
  closeModalBtn.addEventListener("click", onCloseModal);

  window.addEventListener("keydown", onPressKey);

  const watchBtn = document.querySelector(".action-watch");

  const watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));
  if (checkFilm(watchedInLocalstorage, data)) {
    watchBtn.textContent = "remove from Watched";
  } else {
    watchBtn.textContent = "add to Watched";
  }

  watchBtn.addEventListener("click", watchedHandler(data));
}

function onCloseModal() {
  window.removeEventListener("keydown", onPressKey);
  modalWindow.classList.add("is-hidden");

  modalContent.innerHTML = "";

  if (!isHomeScreen) {
    const gallery = document.querySelector(".photo-gallery-list");
    gallery.innerHTML = "";
    const watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));
    markupLibrary(watchedInLocalstorage);
  }
}

function onPressKey(event) {
  if (event.code === "Escape") onCloseModal();
}

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function checkFilm(filmArr, film) {
  if (!filmArr) return false;

  return filmArr.find((item) => item.id === film.id);
}
