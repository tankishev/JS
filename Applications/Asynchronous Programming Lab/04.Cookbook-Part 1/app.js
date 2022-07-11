window.addEventListener('load', onLoad);

async function onLoad(){
    const main = document.getElementsByTagName('main')[0];
    const urlRecepies = 'http://localhost:3030/jsonstore/cookbook/recipes';

    response = await fetch(urlRecepies);
    data = await response.json();
    
    main.innerHTML = '';
    for (recipe of Object.values(data)){
        main.appendChild(genRecipePreview(recipe))
    }
}

function onClick(e){
    const recepies = document.querySelectorAll('.preview');
    if (e.currentTarget.className == 'preview'){
        displayRecipe(e.currentTarget.id)
        recepies.forEach(el => el.style.display = 'none');
    } else {
        e.currentTarget.remove();
        recepies.forEach(el => el.style.display = 'block');
    }
}

async function displayRecipe(id){
    const main = document.getElementsByTagName('main')[0];
    const response = await fetch('http://localhost:3030/jsonstore/cookbook/details/' + id);
    const data = await response.json();

    const article = genRecipeDetails(data);
    main.appendChild(article);
}

function genRecipePreview(data){
    const result = e('article', {className: 'preview', id: data._id},
        e('div', {className: 'title'}, e('h2', {}, data.name)),
        e('div', {className: 'small'}, e('img', {src: data.img}))
    );
    result.addEventListener('click', onClick);
    return result;
}

function genRecipeDetails(data){
    const result = e('article', {},
        e('h2', {}, data.name),
        e('div', {className: 'band'}, 
            e('div', {className: 'thumb'}, e('img', {src: data.img})),
            e('div', {className: 'ingredients'},
                e('h3', {}, 'Ingredients:'),
                e('ul', {})
            )    
        ),
        e('div', {className: 'description'}, e('h3', {}, 'Preparation:'))
    );
    const ul = result.querySelector('div.ingredients ul');
    for (const ingredient of data.ingredients){
        ul.appendChild(e('li', {}, `${ingredient}`))
    }
    const desc = result.querySelector('div.description');
    for (const step of data.steps){
        desc.appendChild(e('p', {}, `${step}`))
    }

    result.addEventListener('click', onClick);
    return result;
}

function e(type, attributes, ...elements){
    const result = document.createElement(type);

    for (const [attribute, value] of Object.entries(attributes || {})){
        result[attribute] = value;
    }

    for (const el of (elements || [])){
        if (typeof el == 'string' || typeof el == 'number'){
            result.textContent = el;
        } else {
            result.appendChild(el);
        }
    }
    return result;
}