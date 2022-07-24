import { listTemplate } from './views.js';
import { cats } from './catSeeder.js';
import { render } from './node_modules/lit-html/lit-html.js';

function start(){
    const section = document.querySelector('#allCats')
    render(listTemplate(cats, onClick), section)
}

function onClick(e, id){
    if (e.target.tagName == 'BUTTON'){
        const div = document.getElementById(id);
        if (div.style.display == 'block'){
            div.style.display = 'none';
        } else {
            div.style.display = 'block';
        }
    }
}

start();