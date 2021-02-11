import cardTemplate from "../templates/movie-card.hbs";


const KEY = '4fbdbd8abdbcde78896e194e86813212';
const baseUrl = `https://api.themoviedb.org/3/`;
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`;
    
let input = '';

function fetchAPI(searchQuery) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&page=1&per_page=9&primary_release_year&query=${searchQuery}`;
  
  fetch(url)
    .then(response => (response.status === 200) ? response.json() : '')
    .then(data => {
    if (searchQuery.length === 0) {
        console.log('please enter a movie title');
        return
     }
        // console.log(data)
       markup(data);
  })    
 .catch(err => console.log(err));

}

function markup(data) {    
  gallery.innerHTML = data.results.map((cover) => cardTemplate(cover)).join('');
}

let form = document.querySelector('#search-form');
let gallery = document.querySelector('.photo-gallery-list');

form.addEventListener('submit', searchMovieHandler);

function searchMovieHandler(event) {
  event.preventDefault();
  gallery.innerHTML = "";
  input = event.target[0].value;
  fetchAPI(input);
}
  


// const date = new Date('2009-12-10');
// console.log(date.getFullYear());
// let yearRelease = new Date (data.results.release_date)