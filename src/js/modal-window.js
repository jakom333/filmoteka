import modalWindowTpl from "../templates/modal-window.hbs";

const filmsList = document.querySelector(".photo-gallery-list");
let film_ID;

const modalWindow = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const overlay = document.querySelector(".modal-overlay");
const closeModalBtn = document.querySelector(
  'button[data-action="close-modal"]',
);

filmsList.addEventListener("click", onOpenModal);
overlay.addEventListener("click", onOverlayClick);
closeModalBtn.addEventListener("click", onCloseModal);

function onOpenModal(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const filmRef = event.target;
  film_ID = filmRef.dataset.id;

const KEY = "8c70e92845ff03879b2dd3fe0ba57aa8";
 let langSearch = localStorage.getItem('lang');
  let movieIUrl = `https://api.themoviedb.org/3/movie/${film_ID}?api_key=${KEY}&language=${langSearch}`;

  function fetchFilmInfo() {
    return fetch(movieIUrl)
      .then((response) => response.json())
      .then((data) => {
      langSearch= langSearch === 'ru-RU' ? false : true;
        return modalMarkup({ ...data, langSearch });
      })
      .catch((err) => console.log(err));
  }
  fetchFilmInfo(film_ID);
}

function modalMarkup(data) {
  modalWindow.classList.remove("is-hidden");

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  const markup = modalWindowTpl(data);
  modalContent.insertAdjacentHTML("afterbegin", markup);

  window.addEventListener("keydown", onPressKey);
}

function onCloseModal() {
  window.removeEventListener("keydown", onPressKey);
  modalWindow.classList.add("is-hidden");
  modalContent.innerHTML = "";
}

function onPressKey(event) {
  if (event.code === "Escape") onCloseModal();
}

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}
