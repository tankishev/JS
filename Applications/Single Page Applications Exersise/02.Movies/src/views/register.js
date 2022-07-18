import { updateNavBar } from "../utils.js";
import { showMovies } from "./home.js";

const view = document.getElementById('form-sign-up');
const main = document.querySelector('div.container');

function showRegister(){
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
        } else if (data.password != data.repeatPassword){
            throw new Error('Passwords do not match');
        } else if (data.password.length < 6 ) {
            throw new Error('Password must be atleast 6 characters long');
        } else {
            const url = 'http://localhost:3030/users/register';
            const res = await fetch(url, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });
            const resData = await res.json();
            if (!res.ok) {
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
}

export { onSubmit, showRegister };