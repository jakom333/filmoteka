import { genres } from "../index.js";
import cardTemplate from "../templates/movie-card.hbs";


const gallery = document.querySelector(".photo-gallery-list");

export default function markup(data) {
    
  gallery.innerHTML = data.results
      .map((movie) => {
        
        let movieGenres = [];
        
          movie.title = movie.title.toUpperCase();
        //   console.log(movie.title.length)
      movie.genre_ids.forEach((el) => {
        const foundGenreName = genres.find((item) => item.id === el);
        movieGenres.push(" " + foundGenreName.name);
      });
      movie.genre_ids = movieGenres.slice(0, 2);

      movie.release_date = movie.release_date.substring(0, 4);
    //   console.log(movie);
      return cardTemplate(movie);
    })
    .join("");
}

