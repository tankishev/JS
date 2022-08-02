import { render as litRender } from '../node_modules/lit-html/lit-html.js';
import { request } from './requests.js';
import page from '../node_modules/page/page.mjs';
import { views } from './views.js';
import {controlers} from './controlers.js';

const {
    logout, 
    loadLogin, 
    loadHome, 
    loadAddBook, 
    loadMyBooks,
    loadRegister,
    loadNav,
    loadDetails
} = controlers;

const nav = document.getElementById('site-header');
const main = document.getElementById('site-content');

function start(){
    page(setUpPageCTX);
    page(loadNav);
    page('/login', loadLogin, loadNav, loadHome);
    page('/register', loadRegister, loadNav, loadHome);
    page('/logout', logout, loadNav, loadHome);
    page('/home', loadHome);
    page('/', '/home');
    page('/details/:bookId', loadDetails);
    page('/add', loadAddBook, loadHome);
    page('/mybooks', loadMyBooks);
    page.start();
}

start();

function setUpPageCTX(ctx, next){
    ctx.views = views;
    ctx.render = litRender;
    ctx.main = main;
    ctx.nav = nav;
    ctx.request = request;
    next();
}