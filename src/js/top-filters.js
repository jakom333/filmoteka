export default function renderTopRated(data) {
  data.results.sort((a, b) => b.vote_average - a.vote_average);
}

function makeTopDateRelease(data) {
  data.results.sort(function (a, b) {
    return b.release_date - a.release_date;
  });
}
let anakvjna = [];
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
}
