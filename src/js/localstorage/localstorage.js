import { checkFilm } from "../modal-window.js";

export default function watchedHandler(data, btn) {
  return function () {
    let lang = localStorage.getItem("lang");

    let watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));
    if (!watchedInLocalstorage) watchedInLocalstorage = [];

    if (!checkFilm(watchedInLocalstorage, data)) {
      watchedInLocalstorage.push(data);
      if (lang === "en-US") {
        btn.textContent = "remove from Watched";
      } else if (lang === "ru-RU") {
        btn.textContent = "удалить из просмотренных";
      }
      localStorage.setItem("watched", JSON.stringify(watchedInLocalstorage));

      let queueInLocalstorage = JSON.parse(localStorage.getItem("queue"));
      if (checkFilm(queueInLocalstorage, data)) {
        queueInLocalstorage.forEach((movie) => {
          if (movie.id === data.id) {
            queueInLocalstorage.splice(queueInLocalstorage.indexOf(movie), 1);
          }
        });
        localStorage.setItem("queue", JSON.stringify(queueInLocalstorage));
      }
    } else {
      watchedInLocalstorage.forEach((movie) => {
        if (movie.id === data.id) {
          watchedInLocalstorage.splice(watchedInLocalstorage.indexOf(movie), 1);
        }
      });

      if (lang === "en-US") {
        btn.textContent = "add to Watched";
      } else if (lang === "ru-RU") {
        btn.textContent = "добавить в просмотренные";
      }
      localStorage.setItem("watched", JSON.stringify(watchedInLocalstorage));
    }
  };
}

export function queueHandler(data, btn) {
  return function () {
    let lang = localStorage.getItem("lang");

    let queueInLocalstorage = JSON.parse(localStorage.getItem("queue"));
    if (!queueInLocalstorage) queueInLocalstorage = [];

    if (!checkFilm(queueInLocalstorage, data)) {
      queueInLocalstorage.push(data);

      if (lang === "en-US") {
        btn.textContent = "remove from queue";
      } else if (lang === "ru-RU") {
        btn.textContent = "удалить из добавленных";
      }

      localStorage.setItem("queue", JSON.stringify(queueInLocalstorage));
    } else {
      queueInLocalstorage.forEach((movie) => {
        if (movie.id === data.id) {
          queueInLocalstorage.splice(queueInLocalstorage.indexOf(movie), 1);
        }
      });

      if (lang === "en-US") {
        btn.textContent = "add to queue";
      } else if (lang === "ru-RU") {
        btn.textContent = "добавить";
      }
      localStorage.setItem("queue", JSON.stringify(queueInLocalstorage));
    }
  };
}
