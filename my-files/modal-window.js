import modalWindowTpl from "../../templates/modal-window.hbs";

const KEY = "8c70e92845ff03879b2dd3fe0ba57aa8";
let url = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&page=1&per_page=9&primary_release_year&query=fight-club`;
const modalWindow = document.querySelector("body");

function fetchFilmInfo() {
  return fetch(url)
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("Error fetching data");
    })
    .then(({ results }) => {
      console.log(results[0]);
      return modalMarkup(results);
    })
    .catch((err) => {
      return console.error("Error: >>", err);
    });
}
fetchFilmInfo();

function modalMarkup(results) {
  const markup = modalWindowTpl(results);
  modalWindow.insertAdjacentHTML("afterbegin", markup);
}

export default modalMarkup;
