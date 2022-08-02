import { render as litRender } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs';
import { request } from './requests.js';
import { views } from './views.js';


import { loadView as loadDashboard } from './controlers/dashboard.js'
import { loadNavi, loadView as loadHome } from './controlers/home.js'
import { login, register, logout } from './controlers/user.js'
import { loadView as loadDetails } from './controlers/details.js'
import { loadView as loadAddPet } from './controlers/addPet.js';

const main = document.getElementById('content');
const nav = document.querySelector('header ul');



function start(){
    page(setUpPageCTX);
    page('/index.html', '/');
    page('/', '/home');
    page('/home', loadNavi, loadHome);
    page('/login', loadNavi, login);
    page('/register', loadNavi, register);
    page('/logout', logout);
    page('/dashboard', loadNavi, loadDashboard, loadDetails);
    page('/details/:petId', loadNavi, loadDetails)
    page('/create', loadNavi, loadAddPet, loadDashboard)

    page.start();
}

function setUpPageCTX(ctx, next){
    ctx.views = views;
    ctx.render = litRender;
    ctx.main = main;
    ctx.nav = nav;
    ctx.request = request;
    ctx.goTo = page;
    next();
}

start()

