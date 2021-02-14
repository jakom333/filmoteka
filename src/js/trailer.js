const key = "4fbdbd8abdbcde78896e194e86813212";
const baseUrl = "https://api.themoviedb.org/3";

function fetchUrl(movieID) {
  console.log(movieID);
  const url = `${baseUrl}/movie/${movieID}/videos?api_key=${key}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let youtubeKey = data.results[0].key;
      console.log(youtubeKey);

      document.body.insertAdjacentHTML(
        "beforeend",
        `<div class="trailer-backdrop">
        <iframe class ="trailer"
          src="http://www.youtube.com/embed/${youtubeKey}?color=white" modestbranding=1"
          modestbranding=1
          frameborder="0"
          autoplay=1
          allow="accelerometer; picture-in-picture; autoplay"
          allowfullscreen
          >
          <img></img>
          </iframe>
           <button class="btn-close-player">
          <svg class="btn-close-icon">
              <use href="./images/symbol-defs.svg#icon-cancel"></use>
            </svg>
          </button> 
          </div>`,
      );
    })
    .catch(() => {
      document.body.insertAdjacentHTML(
        "beforeend",

        `<iframe class ="trailer"
          src="http://www.youtube.com/embed/${youtubeKey}?enablejsapi=1&origin=http://example.com"
          frameborder="0"
          allow="accelerometer; autoplay=1; picture-in-picture; allowfullscreen"
          allowfullscreen
          ></iframe>
          `,
      );
    });
}
export function playTrailer() {
  const trailerBoxSvgRefs = document.querySelector(".trailer-box-svg");
  // const posterRefs = document.querySelector(".poster");
  // const posterBoxRefs = document.querySelector(".poster-box");
  const buttonTrailerRefs = document.querySelector(".button-trailer");
  const posterSvgRefs = document.querySelector(".trailer-box-svg-on");
  function showPosterPlay(event) {
    let movieID = event.target.dataset.id;
    console.log(movieID);
    fetchUrl(movieID);
    // trailerBoxSvgRefs.style.opacity = "0";
  }
  const escClickHandler = (event) => {
    const backTrailerRef = document.querySelector(".trailer-backdrop");
    if (event.code === "Escape") {
      backTrailerRef.innerHTML = "";
      window.removeEventListener("keydown", (event) => {});
    }
  };

  posterSvgRefs.addEventListener("click", showPosterPlay);
  buttonTrailerRefs.addEventListener("click", showPosterPlay);
  window.addEventListener("keydown", escClickHandler);
}

// export default {
//   key: "4fbdbd8abdbcde78896e194e86813212",
//   baseUrl: "https://api.themoviedb.org/3/",
//   idTrailer: "",

//   fetchUrl() {
//     const url = `https://api.themoviedb.org/3/movie/551/videos?api_key=4fbdbd8abdbcde78896e194e86813212`;
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         let youtubeKey = data.results[0].key;
//         console.log(youtubeKey);

//         document.body.insertAdjacentHTML(
//           "beforeend",
//           `<iframe class ="trailer"
//           src="http://www.youtube.com/embed/${youtubeKey}?enablejsapi=1&origin=http://example.com"
//           frameborder="0"
//           allow="accelerometer; autoplay=1; picture-in-picture; allowfullscreen"
//           allowfullscreen
//           ></iframe>`,
//         );
//       })
//       .catch(() => {
//         document.body.insertAdjacentHTML(
//           "beforeend",
//           `<iframe class ="trailer"
//           src="http://www.youtube.com/embed/${youtubeKey}?enablejsapi=1&origin=http://example.com"
//           frameborder="0"
//           allow="accelerometer; autoplay=1; picture-in-picture; allowfullscreen"
//           allowfullscreen
//           ></iframe>`,
//         );
//       });
//   },
//   showModalPosterPlay() {
//     // const trailerBoxSvgRefs = document.querySelector(".trailer-box-svg");
//     // const posterRefs = document.querySelector(".poster");
//     // const posterBoxRefs = document.querySelector(".poster-box");
//     const buttonTrailerRefs = document.querySelector(".button-trailer");
//     const posterSvgRefs = document.querySelector(".trailer-box-svg-on");
//     const fetchUrlFn = this.fetchUrl;
//     function showPosterPlay(event) {
//       fetchUrlFn();
//       console.log(event.target.dataset.id);
//     }

//     posterSvgRefs.addEventListener("click", showPosterPlay);
//     buttonTrailerRefs.addEventListener("click", showPosterPlay);
//   },
// };

// async fetchUrl() {
//     const response = await fetch(this.url);
//     const movie = await response.json();
//     this.fetchUrl().then((data) => {
//       let youtubeKey = data.results[0].key;
//       console.log(youtubeKey);

//       const traiLler = document.body.insertAdjacentHTML(
//         "beforeend",
//         `<iframe
//       class ="trailer"
//         width="320"
//         height="160"
//         src="http://www.youtube.com/embed/${youtubeKey}?enablejsapi=1&origin=http://example.com"
//         frameborder="0"
//         allow="accelerometer; autoplay=1; picture-in-picture; allowfullscreen"
//         allowfullscreen
//       ></iframe>
//       <button type="text" class="trailer-close">x</button>
//        `,
//       );
//     });
//   },
