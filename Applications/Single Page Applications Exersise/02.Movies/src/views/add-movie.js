import { showMovies } from "./home.js";

const view = document.getElementById('add-movie');
const main = document.querySelector('div.container');

function showView(){
    document.querySelectorAll('.view-section').forEach(v => v.remove());
    main.insertBefore(view, main.lastElementChild);
}

async function addMovie(e){
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
        if (Object.values(data).some(el => el == '')){
            throw new Error('Please fill all fields');
        } else {
            const url = 'http://localhost:3030/data/movies';
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            data['_ownerId'] = userData._id;
            const res = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userData.accessToken
                },
                body: JSON.stringify(data)
            });
            const resData = await res.json();
            if (!res.ok) {
                throw new Error(resData.message);
            }
            form.reset();
            showMovies();
        }
    } catch (error) {
        alert(error.message);
    } 
};

export { addMovie, showView };