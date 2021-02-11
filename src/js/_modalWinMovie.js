import "styles.css";

const apiKey = "a3f1bffb5eca2c1e671aa27884e4851b";

function fetchOneMovieInfo(movie_id) {
  return fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${key}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
