import { e } from './utils.js';
export {loadRecipes, createRecipePreview};

const baseUrl = 'http://localhost:3030/data/recipes';
const main = document.querySelector('main');

async function loadRecipes(){
    const frag = document.createDocumentFragment();
    const recipes = await request(baseUrl);    
    recipes
        .map(createRecipePreview)
        .forEach(c => frag.appendChild(c))
    main.replaceChildren(frag);
}

function createRecipePreview(recipe) {
    const result = e('article', { className: 'preview', onClick: toggleCard },
        e('div', { className: 'title' }, e('h2', {}, recipe.name)),
        e('div', { className: 'small' }, e('img', { src: recipe.img })),
    );
    result.style.display = 'block';
    return result;

    async function toggleCard() {
        const fullRecipe = await request(`${baseUrl}/${recipe._id}`);
        result.replaceWith(createRecipeCard(fullRecipe));
    }
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

    result.style.display = 'block';
    return result;

    async function toggleCard() {
        result.replaceWith(createRecipePreview(recipe));
    }
}

async function request(url){
    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok){
            throw new Error(data.message);
        }
        return data;
    } catch (err) {
        console.log(err.message);
    }
}