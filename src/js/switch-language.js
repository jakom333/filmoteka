import refs from './refs.js';
import translatedData from '../data-base/translated.json';
import fetchMovies, { fetchGenres } from "./fetchMovies.js";
// import { genres } from '../index.js';



export default

refs.switcher.addEventListener('click', switchLangHandler);
function switchLangHandler(event) {
  event.preventDefault();
  let lang;

  if (event.target.classList.contains('underline')) {
    event.target.classList
  }
 let activeLang = refs.switcher.querySelector('.underline');
  activeLang.classList.remove('underline');
  event.target.classList.add('underline');
  
  if (event.target === refs.enBtn) {
    lang = 'EN';
  } else {
    lang= 'RU'
  };
  
   document.documentElement.lang = lang.toLocaleLowerCase();
  changeLangSearch(lang);

  let genres = [];
  fetchGenres().then((res) => {
  genres = res;
  fetchMovies();
});


    // fetchGenres();
    // fetchMovies();
  
  refs.input[0].placeholder = translatedData[lang].input;
  refs.homeBtn.textContent = translatedData[lang].home;
  refs.byStudents.textContent = translatedData[lang].footerStudents;
  refs.libraryBtn.textContent=translatedData[lang].library;
  refs.watchedBtn.textContent=translatedData[lang].watchedButton;
  refs.queueBtn.textContent=translatedData[lang].queueButton;
  refs.copyright.textContent=translatedData[lang].copyright;
  refs.developed.textContent=translatedData[lang].footerDeveloped;
  refs.by.textContent = translatedData[lang].by;

  };
  
  function changeLangSearch(lang) {
    if (lang === 'RU') {   
      localStorage.setItem('lang', 'ru-RU');
    } else {
      localStorage.setItem('lang', 'en-US');
    }
};
    
