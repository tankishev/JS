import { render } from './node_modules/lit-html/lit-html.js'
import { bodyTemplate, templateFormAddBook, templateFormEditBook } from './elements.js'

const body = document.querySelector('body');
const funcs = {
    'load': loadBooks,
    'edit': loadForEdit,
    'delete': onDelete
}
let bookData;
render(bodyTemplate(null, funcs, templateFormAddBook(onSubmit)), body)

async function loadBooks(){
    const res = await fetchRequest({method: 'get'});
    const data = await res.json();
    bookData = Object.entries(data)
        .map((el) => {
            el[1]['_id'] = el[0];
            return el[1];
        })
    render(bodyTemplate(bookData, funcs, templateFormAddBook(onSubmit)), body);
}

async function onDelete(id){
    const tr = document.querySelector(`[data-id="${id}"]`)
    const res = await fetchRequest({method: 'delete', id});
    const data = await res.json();
    tr.remove();
    bookData = bookData.filter(el => el._id != id);
}

function loadForEdit(id){
    const tr = document.querySelector(`[data-id="${id}"]`)
    const data = {
        title: tr.children[1].textContent,
        author: tr.children[0].textContent,
        id
    }
    render(bodyTemplate(bookData, funcs, templateFormEditBook(data, onEdit)), body);
}

async function onEdit(e){
    e.preventDefault();
    const formData = new FormData(document.querySelector('form'));
    const {author, id, title} = Object.fromEntries(formData.entries());
    
    if (author != '' && title != ''){
        const init = {
            method: 'put',
            id,
            body: JSON.stringify({author, title})
        }
        const res = await fetchRequest(init);
        const data = await res.json()
        loadBooks();
    } 
}
async function onSubmit(e){
    e.preventDefault();
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const {author, title} = Object.fromEntries(formData.entries());
    if (author != '' && title != ''){
        const init = {
            method: 'post',
            body: JSON.stringify({author, title})
        }
        const res = await fetchRequest(init);
        const data = await res.json();
        form.reset();
        loadBooks();
    }
}

async function fetchRequest(attributes){
    let url = 'http://localhost:3030/jsonstore/collections/books';
    const {method, id, body} = attributes;
    let init = {method, headers: {'Content-Type':'application/json'}};

    if (['put', 'delete'].includes(method)){
        url += `/${id}`;
    }
    if (['put', 'post'].includes(method)){
        init['body'] = body;
    }
    try {
        const res = await fetch(url, init);
        if (!res.ok){
            throw new Error(`${res.status} ${res.statusText}`);
        }
        return res;
    } catch (error) {
        console.log(error.message);
    }
}