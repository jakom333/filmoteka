import "./styles.css";
import modalMarkup from "./components/modal-window/modal-window.js";

modalMarkup();

// * ----- SEARCH (Mila): -----
// fetch(
//   `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`,
// ).then((response) =>
//   response
//     .json()
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((err) => console.log(err)),
// );
// fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`).then(
//   (response) =>
//     response
//       .json()
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((err) => console.log(err)),
// );
