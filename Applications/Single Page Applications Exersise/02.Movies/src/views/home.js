import { loadMoviesData } from "../db/movies.js";
import { movieCard } from "../elements/card.js";
import { movieDetails } from "../elements/details.js";

const home = document.getElementById('home-page');
const main = document.querySelector('div.container');
const details = document.getElementById('movie-example');

async function showMovies(){
    document.querySelectorAll('.view-section').forEach(v => v.remove());
    main.insertBefore(home, main.lastElementChild);
    const list = document.getElementById('movies-list');
    list.innerHTML = 'Loading ...';
    const movies = await loadMoviesData();
    list.replaceChildren(...movies.map(movieCard));
};

async function showDetails(movieId){
    document.querySelectorAll('.view-section').forEach(v => v.remove());
    details.innerHTML = 'Loading ...';
    main.insertBefore(details, main.lastElementChild);
    const movieData = await loadMoviesData(movieId);
    const {img, title, description, _ownerId, ...rest} = movieData;
    
    const movie = movieDetails({img, title, description})
    const userId = JSON.parse(sessionStorage.getItem('userData'))._id;
    if (_ownerId != userId) {
        movie.querySelector('#btnDelete').remove();
        movie.querySelector('#btnEdit').remove();
    }
    details.replaceChildren(movie)
};

export { showMovies, showDetails };