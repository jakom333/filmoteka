import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import {notice, success, error, defaultModules, Notice, PNotifyConfirm} from '@pnotify/core';
// import refs from './refs.js';
// import config from '../config.json';
import cardTemplate from "../templates/movie-card.hbs";
import { genres } from "../index.js";


const KEY = '4fbdbd8abdbcde78896e194e86813212';
const baseUrl = `https://api.themoviedb.org/3/`;
// const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`;
// const genreUrl = `${baseUrl}genre/movie/list?api_key=${KEY}&language=en-US`;

let form = document.querySelector('#search-form');
let gallery = document.querySelector('.photo-gallery-list');    

// let input = '';


function fetchAPI(searchQuery) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&page=1&per_page=9&primary_release_year&query=${searchQuery}`;
  
  fetch(url)
    .then(response => (response.status === 200) ? response.json() : '')
      .then(data => {       
        if (searchQuery.length === 0) {
      notice({
            title: 'NICE TRY!',
            text: ' But please, give us at least one word.',
            delay: 2000
          });
        return
    } else if (!data.results.length) {
         return error({
            text: 'There are no movies with this title! Keep up! Try again!',
            delay: 2000,
          });
        }
    // } else if (!data.results.poster_path) {
              
    //        poster_path = 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg';

    //     }   
        
        console.log(data)

       markup(data);
  })    
 .catch(err => console.log(err));

}


refs.form.addEventListener('submit', searchMovieHandler);

function searchMovieHandler(event) {
    event.preventDefault();
   gallery.innerHTML = "";
  input = event.target[0].value;
  fetchAPI(input);
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
