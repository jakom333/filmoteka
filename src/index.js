import "./styles.css";
import fetchMovies from "../src/js/fetchMovies.js";
import "./components/pagination/pagination.css";

fetchMovies();

/* * ------------- modal-window ---------------- */
import modalWindowTpl from "./templates/modal-window.hbs";

const filmsList = document.querySelector(".photo-gallery-list");
let film_ID;

filmsList.addEventListener("click", onFilmsListClick);

function onFilmsListClick(event) {
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
  filmsList.insertAdjacentHTML("afterbegin", markup);
}
