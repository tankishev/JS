import { html } from './node_modules/lit-html/lit-html.js';
import { classMap } from './node_modules/lit-html/directives/class-map.js';

const navTemplate = (data) => {
    return html`<ul>${data.map(el => html`<li><a href="${el.href}">${el.label}</a></li>`)}</ul>`
};

const articlesTemplate = (data, func) => {
    return data.map(el => articleTemplate(el, func))
}

const articleTemplate = (data, func) => {
    const givenClass = data.class
    const classes = {'highlight': data.highlight}
    classes[givenClass] = true
    return html`
    <article class=${classMap(classes)}>
        <h2>${data.title}</h2>
        ${data.highlight ? html`<h3>Article of the day</h3>` : null}
        <button @click=${(func)}>Click me</button>
        <div class="content">
            <p>${data.content}</p>
        </div>
        ${footerTemplate(data.author)}
    </article>    
    `
}

const timerTemplate = (time) => {
    return html`
    <h3>Timer ${time.hour}:${time.minutes}:${time.seconds}</h3>
    `
}

const footerTemplate = (author) => {
    return html`
    <footer>Author: <span style="font-style: italic">${author}</span></footer>
    `
}

export {
    navTemplate,
    articlesTemplate,
    timerTemplate
}