// const trailerBoxRef = document.querySelector(".trailer-box");
const KEY = "4fbdbd8abdbcde78896e194e86813212";
const BASE_URL = `https://api.themoviedb.org/3/`;
const url = `${BASE_URL}movie/25/videos?api_key=${KEY}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    let youtubeKey = data.results[0].key;
    console.log(youtubeKey);

    const traiLler = document.body.insertAdjacentHTML(
      "beforeend",
      `<iframe
      class ="trailer"
        width="640"
        height="336"
        src="http://www.youtube.com/embed/${youtubeKey}?enablejsapi=1&origin=http://example.com"
        frameborder="0"
        allow="accelerometer; autoplay=1; picture-in-picture; allowfullscreen"
        allowfullscreen
      ></iframe>
      <button type="text" class="trailer-close">x</button>
       `,
    );
  });

// const KEY = "4fbdbd8abdbcde78896e194e86813212";
// const BASE_URL = `https://api.themoviedb.org/3`;
// const url = `${BASE_URL}/movie/551/videos?api_key=${KEY}`;
// console.log(url);

// // const trailerBoxRef = document.querySelector(".trailer-box");
// const getVideo = async () => {
//   const response = await fetch(url);
//   const video = response.json();
//   return video;
// };
// getVideo().then((data) => {
//   let videoKey = data.results[0].key;
//   console.log(videoKey);

//   const trailer = document.body.insertAdjacentHTML(
//     "beforeend",
//     `<iframe
//       class ="trailer"
//         width="640"
//         height="320"
//         src="http://www.youtube.com/embed/${videoKey}?enablejsapi=1&origin=http://example.com"
//         frameborder="0"
//         allow="accelerometer; autoplay; picture-in-picture"
//         allowfullscreen
//       ></iframe>
//              `,
//   );
// });
