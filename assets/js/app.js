let movies = [];

//Axtarilan film
const searchedMovie = document.querySelector(".search_text");
searchedMovie.addEventListener("keydown", event => {
    if (event.keyCode == 13) {
        searchMovie();
        searchedMovie.value = ''
        event.preventDefault()
    }
});



async function searchMovie() {
   await  fetch(`https://www.omdbapi.com/?apikey=f93f3097&s=${searchedMovie.value}`)
        .then((resp) => resp.json())
        .then(function (data) {
            const movieResult = data.Search;
            movieResult.map(movie => {
                if (movie.Poster === 'N/A') {
                    movie.Poster = "/assets/images/default.png";
                }
                movies.push(movie)


            })
            prepareMovies(movies);
            movies = []
        })
}


// filmleri hazırla...
function prepareMovies(movies) {
    document.querySelector("#movies").innerHTML = "";
    movies.forEach(movie => {
        let movie_card = document.createElement("movie-card");
        movie_card.setAttribute("title", movie.Title);
        movie_card.setAttribute("poster", movie.Poster);
        movie_card.setAttribute("isFavourite", movie.isFavourite);
        movie_card.setAttribute("imdbID", movie.imdbID);
        movie_card.innerHTML = `${movie.Type} /  ${movie.Year}`;

        document.querySelector("#movies").append(movie_card);
    });
}