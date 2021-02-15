import { markupLibrary } from "../markup-library.js";

const gallery = document.querySelector(".photo-gallery-list");

export default function watchedHandler(data) {
  return function () {
    let watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));
    if (!watchedInLocalstorage)
      watchedInLocalstorage = [];
    const watchBtn = document.querySelector(".watch-js");
    if (watchBtn.textContent === "add to Watched") {
      watchedInLocalstorage.push(data);
      watchBtn.textContent = "remove from Watched";
      localStorage.setItem("watched", JSON.stringify(watchedInLocalstorage));
    } else if ((watchBtn.textContent = "remove from Watched")) {
      watchedInLocalstorage.forEach((film) => {
        if (film.id === data.id) {
          watchedInLocalstorage.splice(watchedInLocalstorage.indexOf(data), 1);
        }
        gallery.innerHTML = "";
        markupLibrary(watchedInLocalstorage);
      });
      watchBtn.textContent = "add to Watched";
      localStorage.setItem("watched", JSON.stringify(watchedInLocalstorage));
    }
  };
}
