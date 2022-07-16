import { loadRecipes } from './recipes.js';
export { navigate, views };

const views = Object.fromEntries(Array.from(document.querySelectorAll('article')).map(el => [el.id, el]));
const main = document.querySelector('main');

async function navigate(view){
    if (view == 'catalog'){
        main.innerHTML == '<p style="color: white">Loading...</p>';
        await loadRecipes()
    } else if (view in views){
        const nextView = views[view];
        main.replaceChildren(views[view]);    
        nextView.style.display = 'block';
    }
    updateButtons(view)
    updateNav();
}

function updateNav(){
    const guestBtns = document.getElementById('guest');
    const userBtns = document.getElementById('user');
    if (sessionStorage.getItem('authToken') == null) {
        guestBtns.style.display = 'inline-block';
        userBtns.style.display = 'none';
    } else {
        guestBtns.style.display = 'none';
        userBtns.style.display = 'inline-block';
    }
}

function updateButtons(view){
    const navBnts = document.querySelectorAll('nav a');
    navBnts.forEach(btn => {
        btn.classList.remove('active');
        if (btn.id.slice(0,-3) == view){
            btn.classList.add('active');
        }
    })
}