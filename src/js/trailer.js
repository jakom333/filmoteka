const backTrailerRef = document.querySelector(".trailer-box");
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
      backTrailerRef.classList.add("is-open");
      backTrailerRef.insertAdjacentHTML(
        "beforeend",
        `<iframe class ="trailer"
          src="http://www.youtube.com/embed/${youtubeKey}?autoplay=1&color=white&modestbranding=1" 
          frameborder="0"
           allow="accelerometer; picture-in-picture; autoplay"
          allowfullscreen
          ></iframe>
          `,
      );
    })
    .catch(() => {
      backTrailerRef.classList.add("is-open");
      backTrailerRef.insertAdjacentHTML(
        "beforeend",
        `<iframe class ="trailer"
         src="http://www.youtube.com/embed/50?autoplay=1&color=white&modestbranding=1" 
          frameborder="0"
           allow="accelerometer; picture-in-picture; autoplay"
          allowfullscreen
          ></iframe>
          `,
      );
    });
}

function escPlayerHandler(event) {
  console.log(event.code);
  if (event.code === "Escape") {
    onClosePlayer();
  }
}

function onClosePlayer() {
  window.addEventListener("keydown", escPlayerHandler);
  backTrailerRef.classList.remove("is-open");
  backTrailerRef.innerHTML = "";
}

window.addEventListener("keydown", escPlayerHandler);
backTrailerRef.addEventListener("click", onClosePlayer);

export function playTrailer() {
  const buttonTrailerRefs = document.querySelector(".button-trailer");
  const posterSvgRefs = document.querySelector(".trailer-box-svg-on");

  function showPosterPlay(event) {
    let movieID = event.target.dataset.id;
    console.log(movieID);
    fetchUrl(movieID);
  }
  posterSvgRefs.addEventListener("click", showPosterPlay);
  buttonTrailerRefs.addEventListener("click", showPosterPlay);
}

//  <button class="btn-close-player">
//    <svg class="btn-close-icon">
//      <use href="./images/symbol-defs.svg#icon-cancel"></use>
//    </svg>
//  </button>;
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
