import { render } from './node_modules/lit-html/lit-html.js'
import { listTemplate } from './templates.js'

function start(){
    const form = document.querySelector('form');
    form.addEventListener('submit', onSubmit);
}

function onSubmit(e){
    e.preventDefault();
    const towns = document.querySelector('input#towns').value
    if (towns) {
        updateList(towns.split(', '))
    }
}

function updateList(data){
    const root = document.querySelector('#root');
    render(listTemplate(data), root)
}
start()