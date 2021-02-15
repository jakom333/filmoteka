import modalWindowTpl from "../templates/modal-window.hbs";
import watchedHandler from "../js/localstorage/localstorage.js";
import { isHomeScreen } from "../js/markup-library.js"
import { markupLibrary } from "../js/markup-library.js"

const filmsList = document.querySelector(".photo-gallery-list");
let film_ID;

const modalWindow = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const overlay = document.querySelector(".modal-overlay");
const closeModalBtn = document.querySelector(
  'button[data-action="close-modal"]',
);


filmsList.addEventListener("click", onOpenModal);
overlay.addEventListener("click", onOverlayClick);
closeModalBtn.addEventListener("click", onCloseModal);

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
  modalWindow.classList.remove("is-hidden");
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  const markup = modalWindowTpl(data);
  modalContent.insertAdjacentHTML("afterbegin", markup);
  window.addEventListener("keydown", onPressKey);
  const watchBtn = document.querySelector(".watch-js");
  
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
  if (!filmArr)
    return false;
  
  return filmArr.find((item) => item.id === film.id);
}
