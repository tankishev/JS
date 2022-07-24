import { html } from './node_modules/lit-html/lit-html.js'

export function dropdownTemplate(data){
    return html`<option .value=${data._id}>${data.text}</option>`
}