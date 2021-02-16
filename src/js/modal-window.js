import { playTrailer } from "./trailer.js";
import modalWindowTpl from "../templates/modal-window.hbs";
import watchedHandler from "../js/localstorage/localstorage.js";
import {queueHandler} from "../js/localstorage/localstorage.js";
import { isHomeScreen } from "../js/markup-library.js";
import { isWatched } from "../js/markup-library.js";
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
      .then((response) => response.json())
      .then((data) => {
        langSearch = langSearch === "ru-RU" ? false : true;
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

  const closeModalBtn = document.querySelector(
    'button[data-action="close-modal"]',
  );
  closeModalBtn.addEventListener("click", onCloseModal);

  window.addEventListener("keydown", onPressKey);  

  const watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));
  let queueInLocalstorage = JSON.parse(localStorage.getItem("queue")); 

  const watchBtnModal = document.querySelector(".action-watch");
  const queueBtnModal = document.querySelector(".action-queue");

  if (checkFilm(watchedInLocalstorage, data)) {    
    watchBtnModal.textContent = "remove from Watched";
  } else {
    watchBtnModal.textContent = "add to Watched";
  }

  if (checkFilm(queueInLocalstorage, data)) {
    queueBtnModal.textContent = "remove from queue";    
  } else {
    queueBtnModal.textContent = "add to queue";
  }

  watchBtnModal.addEventListener("click", watchedHandler(data));
  queueBtnModal.addEventListener("click", queueHandler(data));  
}



function onCloseModal() {
  window.removeEventListener("keydown", onPressKey);
  modalWindow.classList.add("is-hidden");

  modalContent.innerHTML = "";

  if (!isHomeScreen && isWatched) {
    const gallery = document.querySelector(".photo-gallery-list");
    gallery.innerHTML = "";
    const watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));
    markupLibrary(watchedInLocalstorage);
  } else if (!isHomeScreen && !isWatched) {
    const gallery = document.querySelector(".photo-gallery-list");
    gallery.innerHTML = "";
    const queueInLocalstorage = JSON.parse(localStorage.getItem("queue"));
    markupLibrary(queueInLocalstorage);
  }
}

export function onPressKey(event) {
  if (event.code === "Escape") onCloseModal();
}

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

export function checkFilm(filmArr, film) {
  if (!filmArr) return false;

  return filmArr.find((item) => item.id === film.id);
}
