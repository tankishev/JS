import { render as litRender } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { views } from './views.js';
import { request } from './requests.js';
import { loadControlers } from './controlers.js';

const nav = document.querySelector('nav');
const main = document.querySelector('main');
// const errBox = document.getElementById('errorBox');
// const errMessage = errBox.querySelector('span');

function start(){
    const controlers = loadControlers(page, onError);
    
    page(pageSetUp);
    page(controlers.navigation);
    page('/home', controlers.home);
    page('/', '/home');
    page('/login', controlers.login, controlers.navigation, () => page('/home'));
    page('/register', controlers.register, controlers.navigation, () => page('/home'));
    page('/logout', controlers.logout, controlers.navigation, () => page('/home'));
    page('/create', controlers.create, () => page('/home'));
    page('/games', controlers.showAll);
    page('/details/:itemId', controlers.showDetails, () => page('/home'));
    // page('/profile', controlers.profile)
    
    page.start();
}

start()

function pageSetUp(ctx, next){
    ctx.views = views;
    ctx.render = litRender;
    ctx.nav = nav;
    ctx.main = main;
    ctx.request = request;
    next();
}

function onError(err){
    alert(err.message);
    console.log(err.message);
    // errMessage.textContent = err.message;
    // errBox.style.display = 'block';
    // setTimeout(() => {errBox.style.display = ''}, 3000)
}
