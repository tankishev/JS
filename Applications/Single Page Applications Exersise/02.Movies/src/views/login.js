import { updateNavBar } from "../utils.js";
import { showMovies } from "./home.js";

const view = document.getElementById('form-login');
const main = document.querySelector('div.container');

function showLogin(){
    document.querySelectorAll('.view-section').forEach(v => v.remove());
    main.insertBefore(view, main.lastElementChild);
}

async function onSubmit(e){
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
        if (data.email == ''){
            throw new Error('Email cannot be blank');
        } else if (data.password == ''){
            throw new Error('Passwords cannot be blank');
        } else {
            const url = 'http://localhost:3030/users/login';
            const res = await fetch(url, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            const resData = await res.json();
            if (!res.ok) {
                console.log('here')
                throw new Error(resData.message);
            }
            const {accessToken, _id, email, ...rest} = resData;
            const userData = JSON.stringify({accessToken, _id, email});
            sessionStorage.setItem('userData', userData);
            form.reset();
            showMovies();
            updateNavBar();
        }
    } catch (error) {
        alert(error.message);
    } 
};

async function logout(){
    try {
        const url = 'http://localhost:3030/users/logout';
        const accessToken = JSON.parse(sessionStorage.getItem('userData')).accessToken;
        const res = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken
            }
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message);
        }
        sessionStorage.clear();
        showMovies();
        updateNavBar();
    } catch (error) {
        alert(error.message);
    }
};

export { onSubmit, logout , showLogin };