import { checkFilm } from "../modal-window.js";

export default function watchedHandler(data) {


  return function () {
    let watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));

    if (!watchedInLocalstorage) watchedInLocalstorage = [];

        if (!checkFilm(watchedInLocalstorage, data)) {
      watchedInLocalstorage.push(data);

  
       watchBtnModal.textContent = "remove from Watched";
      localStorage.setItem("watched", JSON.stringify(watchedInLocalstorage));
      
    } else {
      watchedInLocalstorage.forEach((movie) => {
        if (movie.id === data.id) {
          watchedInLocalstorage.splice(watchedInLocalstorage.indexOf(movie), 1);
        }
      });

    
        watchBtnModal.textContent = "add to Watched";
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
       queueBtnModal.textContent = "remove from queue";
   

      localStorage.setItem("queue", JSON.stringify(queueInLocalstorage));
    } else {
      queueInLocalstorage.forEach((movie) => {
        if (movie.id === data.id) {
          queueInLocalstorage.splice(queueInLocalstorage.indexOf(movie), 1);
        }
      });
        queueBtnModal.textContent = "add to queue";
      localStorage.setItem("queue", JSON.stringify(queueInLocalstorage));
    }
  };
}
