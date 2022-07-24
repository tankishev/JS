import { html } from './node_modules/lit-html/lit-html.js';

export function listTemplate(listData, func){
    return html`<ul>${listData.map(el => listItemTemplate(el, func))}</ul>`;
};

function listItemTemplate(data, func){
    return html`
    <li @click="${(e) => func(e, data.id)}">
        <img src="./images/${data.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn">Show status code</button>
            <div class="status" style="display: none" id="${data.id}">
                <h4>Status Code: ${data.statusCode}</h4>
                <p>${data.statusMessage}</p>
            </div>
        </div>
    </li>`;
};