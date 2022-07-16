import * as login from './login.js';
import * as register from './register.js';
import * as create from './create.js';
import { navigate, views } from './nav.js';

window.addEventListener('load', async () => {  
    const onSumbitFuncs = {
        'login': login.onSubmit,
        'register': register.onSubmit,
        'create': create.onSubmit
    }    
    Object.entries(views).forEach(entry => {
        const [id, view] = entry;
        const form  = view.querySelector('form');
        addFormListener(form, onSumbitFuncs[id])
    });

    document.getElementById('catalogBtn').addEventListener('click', () => navigate('catalog'));
    document.getElementById('createBtn').addEventListener('click', () => navigate('create'));
    document.getElementById('loginBtn').addEventListener('click', () => navigate('login'));
    document.getElementById('registerBtn').addEventListener('click', () => navigate('register'));
    document.getElementById('logoutBtn').addEventListener('click', login.logout);

    navigate('catalog');
});

function addFormListener(form, func) {
    form.addEventListener('submit', (e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        func([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
        form.reset();
    }));
}