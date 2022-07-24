import { html, render } from './node_modules/lit-html/lit-html.js';
import { data, links } from "./data.js";
import { navTemplate, articlesTemplate, timerTemplate } from './templates.js';

window.data = data

function start(){
    const main = document.querySelector('main');
    const nav = document.querySelector('nav');

    render(navTemplate(links), nav)

    const articlesTemplateResult = articlesTemplate(data, onClick)
    render(articlesTemplateResult, main)
    updateTimer()
}

function updateTimer(){
    const timerLocation = document.querySelector('header div')
    const d = new Date()
    let timeData = {
        'hour': d.getHours(),
        'minutes': `0${d.getMinutes()}`.slice(-2),
        'seconds': `0${d.getSeconds()}`.slice(-2) 
    }
    const templateResult = timerTemplate(timeData)
    render(templateResult, timerLocation)
}

function onClick(){
    alert('clicked')
}

// start();
setInterval(start, 1000)