import { markup } from "./markup.js";
import cardTemplate from "../templates/movie-card.hbs";
import fetchMovies from "./fetchMovies.js";

const gallery = document.querySelector(".photo-gallery-list");
const libraryBtn = document.querySelector(".library-button");
const homeBtn = document.querySelector(".home-button");
const queueBtnLibrary = document.querySelector(".queue-button");
const watchBtnLibrary = document.querySelector(".watched-button");
const footer = document.querySelector(".footer");

export let isHomeScreen = true;
export let isWatched = true;

libraryBtn.addEventListener("click", libraryBtnHandler);
watchBtnLibrary.addEventListener("click", libraryBtnHandler);
queueBtnLibrary.addEventListener("click", queueBtnHandler);

function libraryBtnHandler() {
  footer.style.position = "absolute";
  footer.style.bottom = "0";
  isWatched = true;
  watchBtnLibrary.classList.add("button-active");
  queueBtnLibrary.classList.remove("button-active");

  const watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));

  gallery.innerHTML = "";
  markupLibrary(watchedInLocalstorage);
  isHomeScreen = false;
}

function queueBtnHandler() {
  isWatched = false;
  watchBtnLibrary.classList.remove("button-active");
  queueBtnLibrary.classList.add("button-active");

  const queueInLocalStorage = JSON.parse(localStorage.getItem("queue"));
  gallery.innerHTML = "";
  markupLibrary(queueInLocalStorage);
}

export function markupLibrary(data) {
  if (!data) return;
  data.map((movie) => markup(movie));
  gallery.innerHTML = cardTemplate(data);
}

homeBtn.addEventListener("click", homeBtnHandler);

function homeBtnHandler() {
  footer.style.position = "initial";
  footer.style.bottom = "0";
  gallery.innerHTML = "";
  fetchMovies();
  isHomeScreen = true;
}
