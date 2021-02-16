export default function watchedHandler(data) {
  return function () {
    let watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));    

    if (!watchedInLocalstorage)
      watchedInLocalstorage = [];
    const watchBtn = document.querySelector(".action-watch");

    if (watchBtn.textContent === "add to Watched") {
      watchedInLocalstorage.push(data);
      watchBtn.textContent = "remove from Watched";
      localStorage.setItem("watched", JSON.stringify(watchedInLocalstorage));
      
    } else if ((watchBtn.textContent = "remove from Watched")) {
      watchedInLocalstorage.forEach((film) => {
        if (film.id === data.id) {
          watchedInLocalstorage.splice(watchedInLocalstorage.indexOf(film), 1);
        }
      });
      watchBtn.textContent = "add to Watched";
      localStorage.setItem("watched", JSON.stringify(watchedInLocalstorage));
    }
  };
}
