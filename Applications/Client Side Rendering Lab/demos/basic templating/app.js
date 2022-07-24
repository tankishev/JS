import { data, links } from "./data.js"
import { createTemplate } from "./engine.js"

start()

async function start(){
    const main = document.querySelector('main')
    const nav = document.querySelector('nav ul')

    const articleTemplate = await (await fetch('./templates/article.html')).text()
    const navTemplate = await (await fetch('./templates/nav.html')).text()

    nav.innerHTML = links.map(createTemplate(navTemplate)).join('');
    main.innerHTML = data.map(createTemplate(articleTemplate)).join('');

}