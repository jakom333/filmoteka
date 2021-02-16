
import libraryTemplate from "../templates/library-template.hbs";
import fetchMovies from "./fetchMovies.js";

const gallery = document.querySelector(".photo-gallery-list");
const libraryBtn = document.querySelector(".library-button");
const homeBtn = document.querySelector(".home-button");
const queueBtnLibrary = document.querySelector(".queue-button");
const watchBtnLibrary = document.querySelector(".watched-button");

export let isHomeScreen = true;
export let isWatched = true;


libraryBtn.addEventListener("click", libraryBtnHandler);
watchBtnLibrary.addEventListener("click", libraryBtnHandler);
queueBtnLibrary.addEventListener("click", queueBtnHandler);

function libraryBtnHandler() {
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
  if (!data)
    return;
  data.map((movie) => markupWatchedMovies(movie));  
  gallery.innerHTML = libraryTemplate(data);
}

function markupWatchedMovies(movie) {  
  movie.title = movie.title.toUpperCase();
  
  let movieGenres = [];
  movie.genres.forEach((el) => {   
      movieGenres.push(" " + el.name);
  });
  
  !movieGenres.length ? movieGenres.push("Other") : "";
  movie.genres = movieGenres.slice(0, 2);
  
  movie.release_date = movie.release_date.substring(0, 4);

    if (movie.poster_path)
      movie.poster_path =
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" +
        movie.poster_path;
    else
      movie.poster_path =
        "https://sales.arecontvision.com/images/products/img_placeholder_41845_xl.jpg";

    return movie;
}


homeBtn.addEventListener('click', homeBtnHandler)

function homeBtnHandler() {
  gallery.innerHTML = "";
  fetchMovies(); 
  isHomeScreen = true;
}
