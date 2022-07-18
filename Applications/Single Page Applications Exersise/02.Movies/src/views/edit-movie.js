import { editMovie } from "../requests.js";
import { showDetails } from "./home.js";

const view = document.getElementById('edit-movie');
const main = document.querySelector('div.container');
view.querySelector('form').addEventListener('submit', onSubmit)
let movieId;

function showView(data){
    document.querySelectorAll('.view-section').forEach(v => v.remove());
    main.insertBefore(view, main.lastElementChild);
    movieId = data._id;
    view.querySelector('#title').value = data.title;
    view.querySelector('textarea').value = data.description;
    view.querySelector('#imageUrl').value = data.img;
}

async function onSubmit(e){
    e.preventDefault();
    try {
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());  
        if (Object.values(data).some(el => el == '')){
            throw new Error('Please fill all fields');
        } else {
            const result = await editMovie(data, movieId);
            showDetails(movieId);
        }
    } catch (error) {
        alert(error.message);
    } 
}

export {
    showView
}