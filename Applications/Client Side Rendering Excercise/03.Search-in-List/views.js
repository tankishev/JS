import { html } from './node_modules/lit-html/lit-html.js'
import { classMap } from './node_modules/lit-html/directives/class-map.js'

export function listTemplate(data){
    return html`<ul>${data.map(listItemTemplate)}</ul>`;
}

export function listItemTemplate(data){
    const classes = {'active': data.is_active}
    return html`<li class=${classMap(classes)}>${data.name}</li>`;
}