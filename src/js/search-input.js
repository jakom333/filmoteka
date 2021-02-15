import markup from "./markup.js";
import { onSpin, offSpin } from "./spinner.js";
import { currentPage } from "./pagination";
import config from './config.json';
import refs from './refs.js';
import fetchMovies from "./fetchMovies.js";
import translatedData from './translated';


let input = "";
let langSearch="en-US";

function fetchAPI(searchQuery) {
  const url = `${config.baseURL}search/movie?api_key=${config.KEY}&page=${currentPage}
  &primary_release_year&query=${searchQuery}&language=${langSearch}`;

  fetch(url)
    .then((response) => (response.status === 200 ? response.json() : ""))
    .then((data) => {
      if (searchQuery.length === 0) {
        offSpin();
        
        if (langSearch = 'ru-RU') {
          refs.gallery.innerHTML = `<div class="search-input-null"> <h2> Please, give us at least one word! </h2>
         <br><iframe src="https://giphy.com/embed/WY6omKOR8oRLG" width="480" height="232" frameBorder="0" 
         class="giphy-embed" allowFullScreen></iframe><a href="https://giphy.com/gifs/snl-amy-poehler-tina-fey-emmys-WY6omKOR8oRLG">
         </a></div>`
        } else {
           refs.gallery.innerHTML=`<div class="search-input-null"> <h2> Please,RUssia! </h2>
         <br><iframe src="https://giphy.com/embed/WY6omKOR8oRLG" width="480" height="232" frameBorder="0" 
         class="giphy-embed" allowFullScreen></iframe><a href="https://giphy.com/gifs/snl-amy-poehler-tina-fey-emmys-WY6omKOR8oRLG">
         </a></div>`}
        
        return;
      } else if (!data.results.length) {
        refs.gallery.innerHTML = `<div class="search-error"> <h2> Ooops! There are no movies with this title! Try again!</h2>
   <iframe src="https://giphy.com/embed/VIQfHC9jAZbt6ojTdo" width="468" height="480" frameBorder="0" class="giphy-embed" 
   allowFullScreen></iframe><a href="https://giphy.com/gifs/memecandy-VIQfHC9jAZbt6ojTdo"></a><div>`
        offSpin();
        return;
      }
      // console.log(data)
      offSpin();
      markup(data);
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


refs.switcher.forEach(el => {
    el.addEventListener('click', (event) => {
    event.preventDefault;
    refs.langEl.querySelector('.active').classList.remove('active');
    el.classList.add('active');
 
    
    const lang = el.getAttribute('language');
      console.log(lang);
 
  refs.input[0].placeholder = translatedData[lang].input;
  refs.homeBtn.textContent = translatedData[lang].home;
  refs.byStudents.textContent = translatedData[lang].footerStudents;
  refs.libraryBtn.textContent=translatedData[lang].library;
  refs.watchedBtn.textContent=translatedData[lang].watchedButton;
  refs.queueBtn.textContent=translatedData[lang].queueButton;
  refs.copyright.textContent=translatedData[lang].copyright;
  refs.developed.textContent=translatedData[lang].footerDeveloped;
  refs.byStudents.textContent = translatedData[lang].by;
  

  //  refs.addW.textContent=translatedData[lang].addWatched;
  //  refs.addQ.textContent=translatedData[lang].addQueue;
    
    })
  
   langSearch = `ru-RU`;
 
})



