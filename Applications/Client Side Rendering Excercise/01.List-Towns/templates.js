import { html } from './node_modules/lit-html/lit-html.js'

export function listTemplate(data){
    return html`<ul>${data.map(listItemTemplate)}</ul>`;
}

export function listItemTemplate(townName){
    return html`<li>${townName}</li>`;
}
