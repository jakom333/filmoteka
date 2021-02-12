<<<<<<< Updated upstream
import cardTemplate from "../templates/movie-card.hbs";
// import markup from './markup.js';

//https://api.themoviedb.org/3/movie/550?api_key=6f1c32f58bd439b838f8f392fdf2c4dc
=======
import markup from './markup.js';

>>>>>>> Stashed changes

const KEY = "6f1c32f58bd439b838f8f392fdf2c4dc";


<<<<<<< Updated upstream
// fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`)
//   .then(response => (response.json())
//     .then(data => {
//       console.log(data)
//     })
//     .catch(err => console.log(err)));

const gallery = document.querySelector(".photo-gallery-list");
=======
>>>>>>> Stashed changes



export default function fetchMovies() {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`;
        

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      markup(data);
    })
    .catch((err) => console.log(err));
}

<<<<<<< Updated upstream
function markup(data) {    
  gallery.innerHTML = data.results.map((cover) => cardTemplate(cover)).join('');
=======

export function fetchGenres() {
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`;
  return fetch(genreUrl)
    .then((response) => (response.status === 200 ? response.json() : ""))
    .then((data) => {
      return data.genres;
    })
    .catch((err) => console.log(err));
>>>>>>> Stashed changes
}
