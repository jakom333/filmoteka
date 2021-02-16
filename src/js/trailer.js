const backTrailerRef = document.querySelector(".trailer-box");
// const posterBoxRef = document.querySelector(".poster-box");
const key = "4fbdbd8abdbcde78896e194e86813212";
const baseUrl = "https://api.themoviedb.org/3";

function fetchUrl(movieID) {
  const url = `${baseUrl}/movie/${movieID}/videos?api_key=${key}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let youtubeKey = data.results[0].key;
      backTrailerRef.classList.add("is-open");
      backTrailerRef.insertAdjacentHTML(
        "beforeend",
        `<div class="trailer-iframe">
      <iframe class ="trailer"
      type="text/html"
      src="http://www.youtube.com/embed/${youtubeKey}?color=red&modestbranding=1" 
      frameborder="0"
      allow="accelerometer; picture-in-picture; autoplay"
      allowfullscreen
      ></iframe>
      </div>
      `,
      );
      const trailerFrameRefs = document.querySelector(".trailer-iframe");
      setTimeout(() => {
        showBtnClosePlayer(trailerFrameRefs);
      }, 500);
    })
    .catch(() => {
      backTrailerRef.classList.add("is-open");
      backTrailerRef.insertAdjacentHTML(
        "beforeend",
        `<div class="trailer-iframe">
        <iframe class ="trailer"
        type="text/html"
          src="http://www.youtube.com/embed/2jPdejek5QA?color=red&modestbranding=1" 
          frameborder="0"
          allow="accelerometer; picture-in-picture; autoplay"
          allowfullscreen
          ></iframe>
          <button class="btn-close-player">
            <svg class="btn-close-icon">
              <use href="./images/symbol-defs.svg#icon-cancel"></use>
            </svg>
          </button>
          </div>
          `,
      );
      const trailerFrameRefs = document.querySelector(".trailer-iframe");
      setTimeout(() => {
        showBtnClosePlayer(trailerFrameRefs);
      }, 500);
    });
}

function makeIframe() {}

function showBtnClosePlayer(trailerFrameRefs) {
  trailerFrameRefs.insertAdjacentHTML(
    "beforeend",
    `<button class="btn-close-player">
      <svg class="btn-close-icon">
      <use href="./images/symbol-defs.svg#icon-cancel"></use>
      </svg>
      </button>`,
  );
}

function escPlayerHandler(event) {
  if (event.code === "Escape") {
    onClosePlayer();
  }
  // window.removeEventListener("keydown", escPlayerHandler);
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
    fetchUrl(movieID);
  }
  posterSvgRefs.addEventListener("click", showPosterPlay);
  buttonTrailerRefs.addEventListener("click", showPosterPlay);
}
