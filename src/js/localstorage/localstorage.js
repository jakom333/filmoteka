import { checkFilm } from "../modal-window.js";

export default function watchedHandler(data) {

   let lang = localStorage.getItem('lang');

  return function () {
    let watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));

    if (!watchedInLocalstorage) watchedInLocalstorage = [];

    

    if (!checkFilm(watchedInLocalstorage, data)) {
      watchedInLocalstorage.push(data);

      if (lang === 'en-EN') {
        watchBtnModal.textContent = "remove from Watched";
      } else if (lang === 'ru-RU') {
        watchBtnModal.textContent = "удалить из просмотренных"
      }
      localStorage.setItem("watched", JSON.stringify(watchedInLocalstorage));
      
    } else {
      watchedInLocalstorage.forEach((movie) => {
        if (movie.id === data.id) {
          watchedInLocalstorage.splice(watchedInLocalstorage.indexOf(movie), 1);
        }
      });

      if (lang === 'en-EN') {
        watchBtnModal.textContent = "add to Watched";
      } else if (lang === 'ru-RU') {
         watchBtnModal.textContent = "добавить в просмотренные";
    }
      localStorage.setItem("watched", JSON.stringify(watchedInLocalstorage));
    }
  };
}

export function queueHandler(data, btn) {
  return function () {
    let queueInLocalstorage = JSON.parse(localStorage.getItem("queue"));
    if (!queueInLocalstorage) queueInLocalstorage = [];

    

    if (!checkFilm(queueInLocalstorage, data)) {
      queueInLocalstorage.push(data);
      if (lang === 'en-EN') {
        queueBtnModal.textContent = "remove from queue";
      } else if (lang === 'ru-RU') {
        queueBtnModal.textContent = "удалить из добавленных";
      }

      localStorage.setItem("queue", JSON.stringify(queueInLocalstorage));
    } else {
      queueInLocalstorage.forEach((movie) => {
        if (movie.id === data.id) {
          queueInLocalstorage.splice(queueInLocalstorage.indexOf(movie), 1);
        }
      });

      if (lang === 'en-EN') {
        queueBtnModal.textContent = "add to queue";
      } else if (lang === 'ru-RU') {
        queueBtnModal.textContent = "добавить";
    }
      localStorage.setItem("queue", JSON.stringify(queueInLocalstorage));
    }
  };
}
