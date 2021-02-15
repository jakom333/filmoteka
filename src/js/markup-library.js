
import libraryTemplate from "../templates/library-template.hbs";
import fetchMovies from "./fetchMovies.js";

const gallery = document.querySelector(".photo-gallery-list");
const libraryBtn = document.querySelector(".library-button");
const homeBtn = document.querySelector(".home-button");



libraryBtn.addEventListener("click", libraryBtnHandler);
function libraryBtnHandler() {
  const watchedInLocalstorageJson = localStorage.getItem("watched");
  const watchedInLocalstorage = JSON.parse(watchedInLocalstorageJson);  
  gallery.innerHTML = "";
  
  markupLibrary(watchedInLocalstorage);
}

export function markupLibrary(data) {
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
  return fetchMovies(); 
}
