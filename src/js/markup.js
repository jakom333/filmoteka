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
<<<<<<< Updated upstream
    //   console.log(movie);
=======

      if (movie.poster_path)
        movie.poster_path =
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" +
          movie.poster_path;
      else
        movie.poster_path =
          "https://icon-library.com/images/img-icon/img-icon-0.jpg";

>>>>>>> Stashed changes
      return cardTemplate(movie);
    })
    .join("");
}
<<<<<<< Updated upstream

=======
 
>>>>>>> Stashed changes
