import { loadTopics, onSubmit } from "./topics.js";

const main = document.querySelector('main');
const mainDiv = document.querySelector('div.new-topic-border');

async function start(){
    document.querySelector('form').addEventListener('submit', onSubmit);
    document.querySelector('nav a').addEventListener('click', loadHome);    
    await loadHome();        
}

async function loadHome(){
    main.replaceChildren(mainDiv);
    await loadTopics();
}

start();