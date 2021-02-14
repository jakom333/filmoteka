import { genres } from "../index.js";
import cardTemplate from "../templates/movie-card.hbs";

const gallery = document.querySelector(".photo-gallery-list");



export default function markup(data) {
  
  data.results
    .map((movie) => {
      movie.title = movie.title.toUpperCase();
      
      if (movie.title.length > 33) {        
        movie.title = movie.title.substring(0, 31) + "...";
      }

      let movieGenres = [];
      movie.genre_ids.forEach((el) => {
        const foundGenreName = genres.find((item) => item.id === el);
        movieGenres.push(" " + foundGenreName.name);
      });

      !movieGenres.length ? movieGenres.push("Other") : "";

      movie.genre_ids = movieGenres.slice(0, 2);

      movie.release_date = movie.release_date.substring(0, 4);

      if (movie.poster_path)
        movie.poster_path =
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" +
          movie.poster_path;
      else
        movie.poster_path =
          "https://sales.arecontvision.com/images/products/img_placeholder_41845_xl.jpg";

      return movie;
    });
  
  gallery.insertAdjacentHTML('beforeend', cardTemplate(data.results));
  
}

