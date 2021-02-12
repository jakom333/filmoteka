import cardTemplate from "../templates/movie-card.hbs";
// import markup from './markup.js';
import { genres } from "../index.js";

const KEY = "6f1c32f58bd439b838f8f392fdf2c4dc";

const gallery = document.querySelector(".photo-gallery-list");

export default function fetchMovies() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      markup(data);
    })
    .catch((err) => console.log(err));
}

function markup(data) {
  gallery.innerHTML = data.results
    .map((cover) => {
      let movieGenres = [];
      cover.genre_ids.forEach((el) => {
        const foundGenreName = genres.find((item) => item.id === el);
        movieGenres.push(" " + foundGenreName.name);
      });
      cover.genre_ids = movieGenres.slice(0, 3);

      cover.release_date = cover.release_date.substring(0, 4);
      // console.log(cover);
      return cardTemplate(cover);
    })
    .join("");
}

export function fetchGenres() {
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`;
  return fetch(genreUrl)
    .then((response) => (response.status === 200 ? response.json() : ""))
    .then((data) => {
      return data.genres;
    })
    .catch((err) => console.log(err));
}
