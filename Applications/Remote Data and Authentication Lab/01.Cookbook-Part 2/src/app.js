window.addEventListener('load', async () => {

    const page = window.location.pathname.split('/').pop();

    if (page == 'index.html'){
        const guestNav = document.getElementById('guest');
        const userNav = document.getElementById('user')

        if (!sessionStorage.getItem('accessToken')){
            guestNav.style.display = 'inline';
            userNav.style.display = 'none';
            document.querySelector('main p').textContent = 'Please log in to view the recepies';
    
        } else {
            document.querySelector('main').innerHTML = '';
            guestNav.style.display = 'none';
            userNav.style.display = 'inline';
            loadRecipes();
        }  
    } else if (page == 'register.html'){
        document.querySelector('form').addEventListener('click', registerSubmit);
    }
});

// Register related
async function registerSubmit(e){
    e.preventDefault();
    if (e.target.type == 'submit'){
        const formData = new FormData(e.currentTarget);
        if (formData.get('password') != formData.get('rePass')){
            alert('Passwords must match. Try again.')
        } else if (formData.get('password') == '' || formData.get('email') == '' ){
            alert('Email and password cannot be empty.')
        } else {
            const body = {
                email: formData.get('email'),
                password: formData.get('password')
            }
            try {
                url = 'http://localhost:3030/users/register'
                const res = await fetch(url, genHeaders('post', useToken=false, body));
    
                if (!res.ok){
                    throw new Error(`${res.status} ${res.statusText}`)
                }
    
                const data = await res.json();
                sessionStorage.setItem('accessToken', data.accessToken);
                console.log(data);
    
            } catch (error) {
                console.log(error.message);
            }
        }
    }
}

// Catalogue Related

async function loadRecipes(){
    const main = document.querySelector('main');
    const recipes = await getRecipes();
    const cards = recipes.map(createRecipePreview);
    cards.forEach(c => main.appendChild(c));
}

async function getRecipes() {
    try {
        const url = 'http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg';
        const res = await fetch(url, genHeaders());
        
        if (!res.ok){
            throw new Error(`${res.status} ${res.statusText}`);
        }
    
        const recipes = await res.json();
        return recipes;      
    } catch (error) {
        console.log(error.message); 
    }
}

function createRecipePreview(recipe) {
    const result = e('article', { className: 'preview', id: recipe._id, onClick: toggleCard },
        e('div', { className: 'title' }, e('h2', {}, recipe.name)),
        e('div', { className: 'small' }, e('img', { src: recipe.img })),
    );

    return result;

    async function toggleCard() {
        const fullRecipe = await getRecipeById(recipe._id);
        result.replaceWith(createRecipeCard(fullRecipe));
    }
}

async function getRecipeById(id) {
    const url = `http://localhost:3030/data/recipes/${id}`
    const response = await fetch(url, genHeaders());
    const recipe = await response.json();
    return recipe;
}

function createRecipeCard(recipe) {
    const result = e('article', {onClick: toggleCard},
        e('h2', {}, recipe.name),
        e('div', { className: 'band' },
            e('div', { className: 'thumb' }, e('img', { src: recipe.img })),
            e('div', { className: 'ingredients' },
                e('h3', {}, 'Ingredients:'),
                e('ul', {}, recipe.ingredients.map(i => e('li', {}, i))),
            )
        ),
        e('div', { className: 'description' },
            e('h3', {}, 'Preparation:'),
            recipe.steps.map(s => e('p', {}, s))
        ),
    );

    return result;

    async function toggleCard() {
        result.replaceWith(createRecipePreview(recipe));
    }
}

function genHeaders(method='get', useToken=false, body=null){
    let header  = {
        method,
        headers: {'Content-Type': 'application/json'}
    }
    if (useToken){
        header.headers['X-Authorization'] = sessionStorage.getItem('accessToken');
    }
    if (body){
        header['body'] = JSON.stringify(body);
    }
    return header;
}

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}