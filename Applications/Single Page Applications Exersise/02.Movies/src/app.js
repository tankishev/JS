import { updateNavBar } from "./utils.js";
import { showMovies } from './views/home.js'
import { onSubmit as onRegister , showRegister } from "./views/register.js";
import { logout, onSubmit as onLogin , showLogin } from "./views/login.js";
import { addMovie, showView as showAddMovieView } from "./views/add-movie.js";

function attachListeners(){
    document.getElementById('form-sign-up').addEventListener('submit', onRegister);
    document.getElementById('login-form').addEventListener('submit', onLogin);
    document.getElementById('add-movie-form').addEventListener('submit', addMovie);
    document.querySelector('.navbar-brand').href = '#';
    document.querySelector('#add-movie-button a').addEventListener('click', showAddMovieView);

    const navViews = {
        'Movies': showMovies,
        'Login': showLogin,
        'Logout': logout,
        'Register': showRegister
    }
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(btn => {
        let key = btn.textContent;
        if (key in navViews){
            btn.addEventListener('click', navViews[key]);
        }
    });
}

attachListeners();
showMovies();
updateNavBar();