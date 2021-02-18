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
        btn.classList.add("active");
      } else if (lang === "ru-RU") {
        btn.textContent = "удалить из просмотренных";
        btn.classList.add("active");
      }
      localStorage.setItem("watched", JSON.stringify(watchedInLocalstorage));

      let queueInLocalstorage = JSON.parse(localStorage.getItem("queue"));
      if (!queueInLocalstorage) queueInLocalstorage = [];

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
        btn.classList.remove("active");
      } else if (lang === "ru-RU") {
        btn.textContent = "добавить в просмотренные";
        btn.classList.remove("active");
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
        btn.classList.add("active");
      } else if (lang === "ru-RU") {
        btn.textContent = "удалить из добавленных";
        btn.classList.add("active");
      }

      localStorage.setItem("queue", JSON.stringify(queueInLocalstorage));

      let watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));
      if (!watchedInLocalstorage) watchedInLocalstorage = [];

      if (checkFilm(watchedInLocalstorage, data)) {
        watchedInLocalstorage.forEach((movie) => {
          if (movie.id === data.id) {
            watchedInLocalstorage.splice(watchedInLocalstorage.indexOf(movie), 1);
          }
        });
        localStorage.setItem("watched", JSON.stringify(watchedInLocalstorage));
      }
    } else {
      queueInLocalstorage.forEach((movie) => {
        if (movie.id === data.id) {
          queueInLocalstorage.splice(queueInLocalstorage.indexOf(movie), 1);
        }
      });

      if (lang === "en-US") {
        btn.textContent = "add to queue";
        btn.classList.remove("active");
      } else if (lang === "ru-RU") {
        btn.textContent = "добавить";
        btn.classList.remove("active");
      }
      localStorage.setItem("queue", JSON.stringify(queueInLocalstorage));
    }
  };
}
