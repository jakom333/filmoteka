import modalWindowTpl from "../templates/modal-window.hbs";

const filmsList = document.querySelector(".photo-gallery-list");
let film_ID;

const modalWindow = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const overlay = document.querySelector(".modal-overlay");

filmsList.addEventListener("click", onOpenModal);
overlay.addEventListener("click", onOverlayClick);

function onOpenModal(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const filmRef = event.target;
  film_ID = filmRef.dataset.id;

  const KEY = "8c70e92845ff03879b2dd3fe0ba57aa8";
  let movieIUrl = `https://api.themoviedb.org/3/movie/${film_ID}?api_key=${KEY}&language=en-US`;

  function fetchFilmInfo() {
    return fetch(movieIUrl)
      .then((response) => response.json())
      .then((data) => {
        return modalMarkup(data);
      })
      .catch((err) => console.log(err));
  }
  fetchFilmInfo(film_ID);
}

function modalMarkup(data) {
  modalWindow.classList.remove("is-hidden");

  window.scrollTo({
    // ! may be to delete ?
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  const markup = modalWindowTpl(data);
  modalContent.insertAdjacentHTML("beforeend", markup);

  const closeModalBtn = document.querySelector(
    'button[data-action="close-modal"]',
  );
  closeModalBtn.addEventListener("click", onCloseModal);

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
