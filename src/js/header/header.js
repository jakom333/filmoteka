const refs = {
  libraryBtn: document.querySelector(".library-button"),
  homeBtn: document.querySelector(".home-button"),
  header: document.querySelector(".header"),
  search: document.querySelector(".search"),
  buttons: document.querySelector(".header-buttons"),
  watchedBtn: document.querySelector(".watched-button"),
  queueBtn: document.querySelector(".queue-button"),
};

const changeHeaderLib = function () {
  refs.header.classList.toggle("header-home-background");
  refs.header.classList.toggle("header-library-background");
  refs.search.classList.toggle("hidden");
  refs.buttons.classList.toggle("hidden");
  refs.libraryBtn.classList.toggle("underline");
  refs.homeBtn.classList.toggle("underline");
  refs.libraryBtn.removeEventListener("click", changeHeaderLib);
  refs.homeBtn.addEventListener("click", changeHeaderHome);
};
const changeHeaderHome = function () {
  refs.header.classList.toggle("header-home-background");
  refs.header.classList.toggle("header-library-background");
  refs.search.classList.toggle("hidden");
  refs.buttons.classList.toggle("hidden");
  refs.libraryBtn.classList.toggle("underline");
  refs.homeBtn.classList.toggle("underline");
  refs.homeBtn.removeEventListener("click", changeHeaderHome);
  refs.libraryBtn.addEventListener("click", changeHeaderLib);
};
// ===================
const changeWatchedBtnTheme = function () {
  refs.watchedBtn.classList.toggle("button-anactive");
  refs.watchedBtn.classList.toggle("button-active");
};
const changeQueueBtnTheme = function () {
  refs.queueBtn.classList.toggle("button-anactive");
  refs.queueBtn.classList.toggle("button-active");
};
// =====================

refs.libraryBtn.addEventListener("click", changeHeaderLib);
refs.homeBtn.addEventListener("click", changeHeaderHome);
refs.watchedBtn.addEventListener("click", changeWatchedBtnTheme);
refs.queueBtn.addEventListener("click", changeQueueBtnTheme);
