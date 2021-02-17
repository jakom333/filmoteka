import refs from "./refs.js";
import translatedData from "../data-base/translated.json";
import fetchMovies, { fetchGenres } from "./fetchMovies.js";



let lang = localStorage.getItem('lang');
let activeLang;

if (lang === 'en-EN') {
  activeLang = refs.switcher.querySelector('.circle-color');
  activeLang.classList.remove('circle-color');
  refs.enBtn.classList.add('circle-color');
  translateHTMLtext('EN');

}  else if (lang === 'ru-RU'){
  activeLang = refs.switcher.querySelector('.circle-color');
  activeLang.classList.remove('circle-color');
  refs.ruBtn.classList.add('circle-color');
  translateHTMLtext('RU');
}  
  
  
refs.switcher.addEventListener('click', switchLangHandler);

function switchLangHandler(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'A') {
    return;
  }
  else {
    if (event.target === refs.enBtn) {
      lang = "EN";
    } else if (event.target === refs.ruBtn) {
      lang = "RU";
    };
  }
   
  let activeLang = refs.switcher.querySelector(".circle-color");
  activeLang.classList.remove("circle-color");
  event.target.classList.add("circle-color");

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

 function translateHTMLtext(lang) {
  
  refs.input[0].placeholder = translatedData[lang].input;
  refs.homeBtn.textContent = translatedData[lang].home;
  refs.byStudents.textContent = translatedData[lang].footerStudents;
  refs.libraryBtn.textContent = translatedData[lang].library;
  refs.watchedBtn.textContent = translatedData[lang].watchedButton;
  refs.queueBtn.textContent = translatedData[lang].queueButton;
  refs.copyright.textContent = translatedData[lang].copyright;
  refs.developed.textContent = translatedData[lang].footerDeveloped;
  refs.by.textContent = translatedData[lang].by;
  };
    
