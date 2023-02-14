const apiKey = "api_key=900e7738800eb2e39b3194781683cc3c";
const baseUrl = "https://api.themoviedb.org/3";
const apiUrl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const imgUrl = "https://image.tmdb.org/t/p/w500";
const searchUrl = baseUrl + "/search/movie?" + apiKey;
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(apiUrl);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { original_title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("article");
    movieEl.classList.add("movie-card");
    movieEl.innerHTML = `
    <img
          src="${imgUrl + poster_path}"
          alt="${original_title}"
        />

        <div class="movie-card__info">
          <h3>${original_title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="movie-card__overview">
          <h3>Overview</h3>
          <p>
            ${overview}
          </p>
        </div>
    
    `;

    main.appendChild(movieEl);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchUrl + "&query=" + searchTerm);
  } else {
    getMovies(apiUrl);
  }
});
