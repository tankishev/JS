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
            document.getElementById('logoutBtn').addEventListener('click', logOut);
            loadRecipes();
        }  
    } else if (page == 'register.html'){
        document.querySelector('form').addEventListener('click', registerSubmit);
    } else if (page == 'login.html'){
        document.querySelector('form').addEventListener('click', logIn);
    } else if (page == 'create.html'){
        document.querySelector('form').addEventListener('click', createNewRecipe);
    }
});
// Log-in / Log-out
async function logIn(e){
    e.preventDefault();
    if (e.target.type == 'submit'){
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password){
            alert('Please enter email and password');
        } else {
            try {
                const body = {email, password};
                const url = 'http://localhost:3030/users/login';
                const res = await fetch(url, genHeaders('post', false, body));
                
                if (!res.ok){
                    let err =new Error(`${res.status} ${res.statusText}`);
                    err.status = res.status;
                    throw err;
                }

                const data = await res.json();
                sessionStorage.setItem('accessToken', data.accessToken);
                let address = window.location.href.split('/').slice(0, -1).join('/')
                window.location.href = `${address}/index.html`;

            } catch (error) {
                if (error.status == 403){
                    alert('Wrong username or password');
                } else {
                    console.log(error.message);
                }
            }
        }
    }
}

function logOut(){
    sessionStorage.clear();
    window.location.reload();
}

// Register related
async function registerSubmit(e){
    e.preventDefault();
    
    if (e.target.type == 'submit'){
    
        const formData = new FormData(e.currentTarget);
    
        if (formData.get('password') != formData.get('rePass')){
    
            alert('Passwords must match. Try again.');
    
        } else if (formData.get('password') == '' || formData.get('email') == '' ){
    
            alert('Email and password cannot be empty.');
    
        } else {
    
            const body = {
                email: formData.get('email'),
                password: formData.get('password')
            }
    
            try {
    
                url = 'http://localhost:3030/users/register'
                const res = await fetch(url, genHeaders('post', useToken=false, body));
    
                if (!res.ok){
                    let err = new Error(`${res.status} ${res.statusText}`);
                    err.status = res.status;
                    throw err;
                }
    
                const data = await res.json();
                sessionStorage.setItem('accessToken', data.accessToken);
                
                let address = window.location.href.split('/').slice(0, -1).join('/')
                window.location.href = `${address}/index.html`;
    
            } catch (error) {
                if (error.status == 409){
                    alert('This user is already registered');
                } else {
                    console.log(error.message);
                }
            }
        }
    }
}

// Recipe related
async function createNewRecipe(e){
    e.preventDefault();
    if (e.target.type == 'submit'){
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const img = formData.get('img');
        const ingredients = formData.get('ingredients').split('\n');
        const steps = formData.get('steps').split('\n');
        
        const body = {name, img, ingredients, steps}
        if (!name || !img || !ingredients || !steps){
            alert('Please fill all fields')
        } else {
            try {
                url = 'http://localhost:3030/data/recipes';
                const res = await fetch(url, genHeaders('post', true, body));
                if (!res.ok){
                    let err = new Error(`${res.status} ${res.statusText}`);
                    err.status = res.status;
                    throw err;
                }
                document.querySelector('form').reset();
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