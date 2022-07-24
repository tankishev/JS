import { render } from './node_modules/lit-html/lit-html.js'
import { repeat } from './node_modules/lit-html/directives/repeat.js'
import { dropdownTemplate } from './views.js'

const baseUrl = 'http://localhost:3030/jsonstore/advanced/dropdown' 
const form = document.querySelector('form');
let db;

function start(){
    form.addEventListener('submit', addItem);
    loadData();
}

async function addItem(e) {
    e.preventDefault();
    const inputField = document.querySelector('#itemText')
    const postData = {'text': inputField.value};
    try {
        const res = await fetch(baseUrl, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        });
        if (!res.ok){
            throw new Error(`${res.status} ${res.statusText}`)
        }
        const data = await res.json();
        db.push(data);
        renderOptions();
        form.reset();
    } catch (error) {
        console.log(error.message);
    }
}

async function loadData() {
    const menu = document.querySelector('#menu');
    const data = await (await fetch(baseUrl)).json();
    db = Object.entries(data).map(el => el[1]);
    console.log(db)
    renderOptions()
}

function renderOptions(){
    render(repeat(db, el => el._id, dropdownTemplate), menu);
}

window.addEventListener('load', start);
