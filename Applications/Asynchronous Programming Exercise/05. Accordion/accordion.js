window.addEventListener('load', solution);

async function solution() {
    const main = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const res = await fetch(url);
    const data = await res.json();

    main.innerHTML = '';
    data.forEach(el => {
        main.appendChild(createCard(el));
    });
}

function createCard(data){
    const result = e('div', {className: 'accordion'},
        e('div', {className: 'head'},
            e('span', {}, data.title),
            e('button', {className: 'button', id: data._id}, 'More')
        ),
        e('div', {className: 'extra', style: 'display:none'})
    );

    const btn = result.querySelector('.button');
    const details = result.querySelector('div.extra');
    btn.addEventListener('click', () => {
        if (btn.textContent == 'More'){
            getArticleDetails(btn.id)
                .then((data) => {
                    let p = document.createElement('p');
                    p.textContent = data.content;
                    details.appendChild(p);
                    details.style.display = 'block';
                    btn.textContent = 'Less'})
                .catch(err => console.log(err.message))
        } else {
            btn.textContent = 'More';
            details.style.display = 'none';
            details.innerHTML = '';
        }
    });

    return result;
}

async function getArticleDetails(id){
    const url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + id;
    const result = await fetch(url);
    const data = await result.json();
    return data;
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