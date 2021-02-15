import refs from './refs.js';
import translatedData from '../data-base/translated.json';
import fetchMovies, { fetchGenres} from "./fetchMovies.js";

export default

  refs.switcher.forEach(el => {
  el.addEventListener('click',  (event) => {
    event.preventDefault();
    refs.langEl.querySelector('.active').classList.remove('active');
    el.classList.add('active');
     
    const lang = el.getAttribute('language');
    document.documentElement.lang = lang.toLocaleLowerCase();
    changeLangSearch(lang);
    fetchGenres();
    fetchMovies();
  
  refs.input[0].placeholder = translatedData[lang].input;
  refs.homeBtn.textContent = translatedData[lang].home;
  refs.byStudents.textContent = translatedData[lang].footerStudents;
  refs.libraryBtn.textContent=translatedData[lang].library;
  refs.watchedBtn.textContent=translatedData[lang].watchedButton;
  refs.queueBtn.textContent=translatedData[lang].queueButton;
  refs.copyright.textContent=translatedData[lang].copyright;
  refs.developed.textContent=translatedData[lang].footerDeveloped;
  refs.by.textContent = translatedData[lang].by;

  });
  
  function changeLangSearch(lang) {
    if (lang === 'RU') {
          
      localStorage.setItem('lang', 'ru-RU');
    } else {
      localStorage.setItem('lang', 'en-US');
    }
}
    
});
