import { markup } from "./markup.js";
import { onSpin, offSpin } from "./spinner.js";
import { currentPage } from "./pagination";
import config from "../data-base//config.json";
import refs from "./refs.js";
import renderTopRated from "./top-filters.js";
import cardTemplate from "../templates/movie-card.hbs";

export let input = "";


export function fetchAPI(searchQuery) {
  const langSearch = localStorage.getItem("lang");
  const url = `${config.baseURL}search/movie?api_key=${config.KEY}&page=${currentPage}
  &primary_release_year&query=${searchQuery}&language=${langSearch}`;

  fetch(url)
    .then((response) => (response.status === 200 ? response.json() : ""))
    .then((data) => {
      if (searchQuery.length === 0) {
        offSpin();
        
        if (langSearch === 'en-US') {
          refs.gallery.innerHTML = `<div class="search-error"> <h2> Please, give us at least one word! </h2>
         <br><iframe src="https://giphy.com/embed/WY6omKOR8oRLG" width="480" height="232" frameBorder="0" 
         class="giphy-embed" allowFullScreen></iframe><a href="https://giphy.com/gifs/snl-amy-poehler-tina-fey-emmys-WY6omKOR8oRLG">
         </a></div>`;
        } else {
          refs.gallery.innerHTML = `<div class="search-error"> <h2> Пожалуйста, введите хотя бы что нибуть! </h2>
         <br><iframe src="https://giphy.com/embed/WY6omKOR8oRLG" width="480" height="232" frameBorder="0" 
         class="giphy-embed" allowFullScreen></iframe><a href="https://giphy.com/gifs/snl-amy-poehler-tina-fey-emmys-WY6omKOR8oRLG">
         </a></div>`;
        }
        return;
      } else if (!data.results.length) {
        if (langSearch === 'en-US') {
          refs.gallery.innerHTML = 
     
    `<div class="search-error"> <h2> Ooops! There are no movies with this title! Try again!</h2>
   <video autoplay loop controls width="480" height="492" src="../images/travolta.gif"><div>`
            
          `<div class="search-error"> <h2> Ooops! There are no movies with this title! Try again!</h2>
   <iframe src="https://giphy.com/embed/VIQfHC9jAZbt6ojTdo" width="468" height="480" frameBorder="0" class="giphy-embed" 
   allowFullScreen></iframe><div>`
        } else {
          refs.gallery.innerHTML = `<div class="search-error"> <h2> Фильмов с таким названием нету. Не сдавайтесь! Попробуйте ещё раз!</h2>
   <iframe src="https://giphy.com/embed/VIQfHC9jAZbt6ojTdo" width="468" height="480" frameBorder="0" class="giphy-embed" 
   allowFullScreen></iframe><a href="https://giphy.com/gifs/memecandy-VIQfHC9jAZbt6ojTdo"></a><div>`;
        }

        offSpin();
        return;
      }
      offSpin();
      renderTopRated(data);

      data.results.map((movie) => markup(movie));
      refs.gallery.innerHTML = "";
      refs.gallery.innerHTML = cardTemplate(data.results);

      document.querySelector(".btn-last").textContent = data.total_pages;
      document.querySelector(".btn-last").dataset.index = data.total_pages;
      return data.total_pages;
    })

    .catch((err) => console.log(err));
}

refs.form.addEventListener("submit", searchMovieHandler);
function searchMovieHandler(event) {
  event.preventDefault();
  refs.gallery.innerHTML = "";
  onSpin();
  input = event.target[0].value;
  fetchAPI(input);
  refs.form.reset();
}



