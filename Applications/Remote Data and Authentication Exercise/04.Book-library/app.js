const loadBtn = document.getElementById('loadBooks');
const form = document.querySelector('form');
const tbody = document.querySelector('tbody');
const title = form.querySelector('input[name="title"]');
const author = form.querySelector('input[name="author"]');

onLoad();

function onLoad(){
    loadBtn.addEventListener('click', loadBooks);
    form.addEventListener('click', onSubmit);
    tbody.innerHTML = '';
}

async function onSubmit(e){
    e.preventDefault();
    if (e.target.textContent == 'Submit'){
        const init = {
            method: 'post',
            body: JSON.stringify({author: author.value, title: title.value})
        }
        const res = await fetchRequest(init);
        const data = await res.json();
        
        const newBook = displayBook(data._id, data);
        tbody.appendChild(newBook);
        form.reset();
    }
}

async function loadBooks(){
    const res = await fetchRequest({method: 'get'});
    const data = await res.json();

    tbody.innerHTML = '';
    Object.entries(data)
        .forEach(el => {
            const [id, bookData] = el;
            const result = displayBook(id, bookData);
            tbody.appendChild(result);
        })
}

function displayBook(id, data){
    const result = e('tr',{},
        e('td', {}, data.author),
        e('td',{}, data.title),
        e('td',{},
            e('button',{},'Edit'),
            e('button',{},'Delete')
        )
    );
    result.addEventListener('click', (e) => onBookClick(e, id));
    return result;
}

function onBookClick(e, id){
    if (e.target.tagName == 'BUTTON'){
        e.target.textContent == 'Edit' ? loadForEdit(e, id) : onDelete(e, id);
    }
}

function loadForEdit(e, id){
    const btn = form.querySelector('button');
    form.firstElementChild.textContent = 'Edit FORM';
    btn.textContent = 'Save';
    title.value = e.currentTarget.children[1].textContent;
    author.value = e.currentTarget.children[0].textContent;
    

    const newBtn = btn.cloneNode(true);
    newBtn.addEventListener('click', (ev) => onEdit(ev, id), {once: true});
    btn.replaceWith(newBtn);
}

async function onEdit(e, id){
    e.preventDefault();
    if (author.value != '' && title.value != ''){
        const init = {
            method: 'put',
            id,
            body: JSON.stringify({author: author.value, title: title.value})
        }

        const res = await fetchRequest(init);
        const data = await res.json()
        
        form.firstElementChild.textContent = 'FORM';
        e.target.textContent = 'Submit';
        form.reset();
        loadBooks();
    } else {
        e.target.addEventListener('click', (ev) => onEdit(ev, id), {once: true});
    }
}

async function onDelete(e, id){
    const tr = e.currentTarget;
    const res = await fetchRequest({method: 'delete', id});
    const data = await res.json();
    tr.remove();
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

function e(type, attributes, ...elements){
    const result = document.createElement(type);

    for (const [attribute, value] of Object.entries(attributes || {})){
        result[attribute] = value;
    }

    for (const el of (elements || [])){
        if (typeof el == 'string' || typeof el == 'number'){
            result.innerHTML = el;
        } else {
            result.appendChild(el);
        }
    }
    return result;
}