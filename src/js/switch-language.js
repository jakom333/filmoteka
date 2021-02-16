import refs from "./refs.js";
import translatedData from "../data-base/translated.json";
import fetchMovies, { fetchGenres } from "./fetchMovies.js";


export default
  
refs.switcher.addEventListener('click', switchLangHandler);
function switchLangHandler(event) {
  event.preventDefault();

  let activeLang = refs.switcher.querySelector(".circle-color");
  activeLang.classList.remove("circle-color");
  event.target.classList.add("circle-color");

  if (event.target === refs.enBtn) {
    lang = "EN";
  } else {
    lang = "RU";
  }

  document.documentElement.lang = lang.toLocaleLowerCase();
  changeLangSearch(lang);
  translateHTMLtext(lang);

  fetchGenres(lang).then((res) => {
  fetchMovies();
  });

 };
  
  function changeLangSearch(lang) {
    if (lang === 'RU') {   
      localStorage.setItem('lang', 'ru-RU');
    } else {
      localStorage.setItem('lang', 'en-US');
    }
};

export function translateHTMLtext(lang) {
  
  refs.input[0].placeholder = translatedData[lang].input;
  refs.homeBtn.textContent = translatedData[lang].home;
  refs.byStudents.textContent = translatedData[lang].footerStudents;
  refs.libraryBtn.textContent = translatedData[lang].library;
  refs.watchedBtn.textContent = translatedData[lang].watchedButton;
  refs.queueBtn.textContent = translatedData[lang].queueButton;
  refs.copyright.textContent = translatedData[lang].copyright;
  refs.developed.textContent = translatedData[lang].footerDeveloped;
  refs.by.textContent = translatedData[lang].by;
}
    
