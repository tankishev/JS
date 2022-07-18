import { toggleLike, getMoviesData, getLikes, deleteMovie } from "../requests.js";
import { movieCard } from "../elements/card.js";
import { movieDetails } from "../elements/details.js";
import { showView as editMovie } from "./edit-movie.js";

const home = document.getElementById('home-page');
const main = document.querySelector('div.container');
const details = document.getElementById('movie-example');

async function showMovies(){
    document.querySelectorAll('.view-section').forEach(v => v.remove());
    main.insertBefore(home, main.lastElementChild);
    const list = document.getElementById('movies-list');
    list.innerHTML = 'Loading ...';
    const movies = await getMoviesData();
    list.replaceChildren(...movies.map(movieCard));
};

async function showDetails(movieId){
    const userId = JSON.parse(sessionStorage.getItem('userData'))._id;
    document.querySelectorAll('.view-section').forEach(v => v.remove());
    details.innerHTML = 'Loading ...';
    main.insertBefore(details, main.lastElementChild);
    let [movieData, numLikes] = await Promise.all([
        getMoviesData(movieId),
        getLikes(movieId)
    ]);
    const {img, title, description, _ownerId, ...rest} = movieData;
    const movie = movieDetails({img, title, description, likes: numLikes})

    if (_ownerId == userId) {
        movie.querySelector('#btnDelete').addEventListener('click', async () => {
            await deleteMovie(movieId),
            showMovies();
        });
        movie.querySelector('#btnEdit').addEventListener('click', () => {
            editMovie(movieData)
        });
    } else {
        movie.querySelector('#btnDelete').remove();
        movie.querySelector('#btnEdit').remove();
    }
    
    movie.querySelector('#btnLike').addEventListener('click', async () => {
        numLikes += await toggleLike(movieId);
        movie.querySelector('.enrolled-span').textContent = `Liked ${numLikes}`;
    });
    details.replaceChildren(movie)
};

export { 
    showMovies, 
    showDetails 
};