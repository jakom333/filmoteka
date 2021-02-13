// import modalWindowTpl from "../../templates/modal-window.hbs";

const filmsList = document.querySelector(".photo-gallery-list");

filmsList.addEventListener("click", onFilmsListClick);

function onFilmsListClick(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const filmRef = event.target;
  const film_ID = filmRef.dataset.id;

  fetchFilmInfo(film_ID);
}

const KEY = "8c70e92845ff03879b2dd3fe0ba57aa8";
let movieIUrl = `https://api.themoviedb.org/3/movie/${film_ID}?api_key=${KEY}&language=en-US`;

function fetchFilmInfo(film_ID) {
  return fetch(movieIUrl).then((response) => {
    console.log(response);
    // if (response.status === 200) return response.json();
    // throw new Error("Error fetching data");
  });
  // .then(({ results }) => {
  //   // console.log(results);
  //   return modalMarkup(results);
  // })
  // .catch((err) => {
  //   return console.error("Error: >>", err);
  // });
}
// fetchFilmInfo();

// function modalMarkup(results) {
//   const markup = modalWindowTpl(results);
//   filmsList.insertAdjacentHTML("afterbegin", markup);
// }

// export default modalMarkup;
// export default fetchFilmInfo;
