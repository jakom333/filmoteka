export default function renderTopRated(data) {
    data.results.sort(function (a, b) {
      
        return b.vote_average - a.vote_average;
  });
}


function makeTopDateRelease(data) {
    data.results.sort(function (a, b) {
     return b.release_date - a.release_date;
  });
};

function makeTopPopularity(data) {
  data.results.sort(function (a, b) {
    if (a.popularity < b.popularity) {
      return 1;
    }
    if (a.popularity > b.popularity) {
      return -1;
    }
    return 0;
  });
};






// fetch(`https://api.themoviedb.org/3/search/movie?api_key=4fbdbd8abdbcde78896e194e86813212&language=en-US&query=rambo`)
//     .then((response) => (response.status === 200 ? response.json() : ""))
//     .then((data) => {
//         console.log(data);
//         return renderTopRated(data)
//     }).then((data) => {
//          console.log(data);
//      })
        