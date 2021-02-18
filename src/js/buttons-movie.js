import { checkFilm } from "../js/modal-window.js";
import watchedHandler, { queueHandler } from "./localstorage/localstorage.js";

export default function movieButtons(li, data) {
  if (!li || !data) return;

  for (let index = 0; index < li.length; ++index) {
    let el = li[index];
    let movie = data.results[index];

    el.addEventListener("mouseenter", (e) => {
      let watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));
      let queueInLocalstorage = JSON.parse(localStorage.getItem("queue"));      
      let watchedBtnText;
      let queueBtnText;
      let lang = localStorage.getItem('lang');

      if (checkFilm(watchedInLocalstorage, movie) && lang === "en-US") {
        watchedBtnText = "remove from Watched";
      } else if (checkFilm(watchedInLocalstorage, movie) && lang === "ru-RU") {
        watchedBtnText = "удалить из просмотренных";
      } else if (!checkFilm(watchedInLocalstorage, movie) && lang === "en-US") {
        watchedBtnText = "add to Watched";
      } else if (!checkFilm(watchedInLocalstorage, movie) && lang === "ru-RU") {
        watchedBtnText = "добавить в просмотренные";
      }

      if (checkFilm(queueInLocalstorage, movie) && lang === "en-US") {
        queueBtnText = "remove from queue";
      } else if (checkFilm(queueInLocalstorage, movie) && lang === "ru-RU") {
        queueBtnText = "удалить из очереди";
      } else if (!checkFilm(queueInLocalstorage, movie) && lang === "en-US") {
        queueBtnText = "add to queue";
      } else if (!checkFilm(queueInLocalstorage, movie) && lang === "ru-RU") {
        queueBtnText = "добавить в очередь";
      }

      e.target.insertAdjacentHTML(
        "afterBegin",
        `<div class="film-overlay"><button class="button watched-button button-anactive li-btn-js-watched">${watchedBtnText}</button>
              <button class="button queue-button button-anactive li-btn-js-queue">${queueBtnText}</button></div>`,
      );

      const mainSectionBtnQueue = document.querySelector(".li-btn-js-queue");
      const mainSectionBtnWatched = document.querySelector(
        ".li-btn-js-watched",
      );

      mainSectionBtnWatched.addEventListener(
        "click",
        modalWatchedHandler(movie, mainSectionBtnWatched, mainSectionBtnQueue),
      );
      mainSectionBtnQueue.addEventListener(
        "click",
        modalQueueHandler(movie, mainSectionBtnWatched, mainSectionBtnQueue),
      );
    });
    el.addEventListener("mouseleave", () => {
      const overlay = document.querySelector(".film-overlay");
      if (overlay) {
        overlay.remove();
      }
    });   
  }
}

function modalWatchedHandler(movie, watchBtn, queueBtn) {
  return function () {
    watchedHandler(movie, watchBtn)();
    watchBtn.classList.toggle("button-anactive");
    watchBtn.classList.toggle("button-active");    

    let lang = localStorage.getItem("lang");
    let queueInLocalstorage = JSON.parse(localStorage.getItem("queue"));
    
    if (!queueInLocalstorage) queueInLocalstorage = [];

    if (checkFilm(queueInLocalstorage, movie)) {
      if (lang === "en-US") {
        queueBtn.textContent = "remove from queue";
      } else if (lang === "ru-RU") {
        queueBtn.textContent = "удалить из очереди";
      }
    } else {
      if (lang === "en-US") {
        queueBtn.textContent = "add to queue";
      } else if (lang === "ru-RU") {
        queueBtn.textContent = "добавить в очередь";
      }
    }
  };
}

function modalQueueHandler(movie, watchBtn, queueBtn) {
  return function () {
    queueHandler(movie, queueBtn)();
    queueBtn.classList.toggle("button-anactive");
    queueBtn.classList.toggle("button-active");    

    let lang = localStorage.getItem("lang");
    let watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));
    
    if (!watchedInLocalstorage) watchedInLocalstorage = [];

    if (checkFilm(watchedInLocalstorage, movie)) {
      if (lang === "en-US") {
        watchBtn.textContent = "remove from watched";
      } else if (lang === "ru-RU") {
        watchBtn.textContent = "удалить из просмотренных";
      }
    } else {
      if (lang === "en-US") {
        watchBtn.textContent = "add to watched";
      } else if (lang === "ru-RU") {
        watchBtn.textContent = "добавить в просмотренные";
      }
    }
  };
}
