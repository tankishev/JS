import { html } from '../node_modules/lit-html/lit-html.js'


function viewNavigation(){
    
    return html`
    <!--Users and Guest-->
    <li><a href="/home">Home</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    ${loggedIn()}
    `

    function loggedIn(){
        if(sessionStorage.getItem('accessToken') == null){
            return html`
            <!--Only Guest-->
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>`
        } else {
            return html `
            <!--Only Users-->
            <li><a href="/create">Create Postcard</a></li>
            <li><a href="/logout">Logout</a></li>`
        }
    }
}


function viewDetails(data, funcs){
    const { name, breed, age, weight, image, donations, boolIsOwner, boolCanDonate, boolIsUser } = data;
    const { edit, remove, donate } = funcs;

    return html`
    <!--Details Page-->
    <section id="detailsPage">
        <div class="details">
            <div class="animalPic">
                <img src="${image}">
            </div>
            <div>
                <div class="animalInfo">
                    <h1>Name: ${name}</h1>
                    <h3>Breed: ${breed}</h3>
                    <h4>Age: ${age}</h4>
                    <h4>Weight: ${weight}</h4>
                    <h4 class="donation">Donation: ${donations}$</h4>
                </div>
                ${boolIsUser ? addButtons() : ''}
            </div>
        </div>
    </section>`

    function addButtons(){
        return html`
        <div class="actionBtn">
            <!-- Only for registered user and creator of the pets-->
            ${boolIsOwner ? html`<a href="" class="edit" @click=${edit}>Edit</a>` : ''}
            ${boolIsOwner ? html`<a href="" class="remove" @click=${remove}>Delete</a>` : ''}
            ${boolCanDonate ? html`<a href="" class="donate" @click=${donate}>Donate</a>` : ''}
        </div>`
    }
}

// DONE
function homeView(){
    return html`
    <!--Welcome Page-->
    <section class="welcome-content">
        <article class="welcome-content-text">
            <h1>We Care</h1>
            <h1 class="bold-welcome">Your Pets</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
        </article>
        <article class="welcome-content-image">
            <img src="./images/header-dog.png" alt="dog">
        </article>
    </section>`
}

function loginView(submitFunc){
    return html`
    <!--Login Page-->
    <section id="loginPage">
        <form class="loginForm" @submit=${submitFunc}>
            <img src="./images/logo.png" alt="logo" />
            <h2>Login</h2>

            <div>
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>

            <div>
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>

            <button class="btn" type="submit">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </form>
    </section>`
}

function registrationView(submitFunc){
    return html`
    <!--Register Page-->
    <section id="registerPage">
        <form class="registerForm" @submit=${submitFunc}>
            <img src="./images/logo.png" alt="logo" />
            <h2>Register</h2>
            <div class="on-dark">
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>

            <div class="on-dark">
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>

            <div class="on-dark">
                <label for="repeatPassword">Repeat Password:</label>
                <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
            </div>

            <button class="btn" type="submit">Register</button>

            <p class="field">
                <span>If you have profile click <a href="/login">here</a></span>
            </p>
        </form>
    </section>`
}

function dashboardView(data, showDetails){
    if (data.length > 0){
        return html`
        <!--Dashboard-->
        <section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard">${data.map(el => animalCard(el, showDetails))}
            </div>
        </section>`
    } else {
        return html`
        <!--If there is no pets in dashboard-->
        <div>
            <p class="no-pets">No pets in dashboard</p>
        </div>`
    };
}

function animalCard(data, showDetails){
    const { image, _id, name, breed, _ownerId } = data;
    return html`
    <div class="animals-board">
        <article class="service-img">
            <img class="animal-image-cover" src="${image}">
        </article>
        <h2 class="name">${name}</h2>
        <h3 class="breed">${breed}</h3>
        <div class="action">
            <a class="btn" href="#" @click=${showDetails} data-id=${_id} data-owner=${_ownerId}>Details</a>
        </div>
    </div>
    `
}

function addPetView(submitFunc){
    return html`
    <!--Create Page-->
    <section id="createPage">
        <form class="createForm" @submit=${submitFunc}>
            <img src="/images/cat-create.jpg">
            <div>
                <h2>Create PetPal</h2>
                <div class="name">
                    <label for="name">Name:</label>
                    <input name="name" id="name" type="text" placeholder="Max">
                </div>
                <div class="breed">
                    <label for="breed">Breed:</label>
                    <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
                </div>
                <div class="Age">
                    <label for="age">Age:</label>
                    <input name="age" id="age" type="text" placeholder="2 years">
                </div>
                <div class="weight">
                    <label for="weight">Weight:</label>
                    <input name="weight" id="weight" type="text" placeholder="5kg">
                </div>
                <div class="image">
                    <label for="image">Image:</label>
                    <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
                </div>
                <button class="btn" type="submit">Create Pet</button>
            </div>
        </form>
    </section>`
}

function editPetView(data, submitFunc){
    const { image, name, breed, weight, age} = data;
    return html`
    <!--Edit Page-->
    <section id="editPage">
        <form class="editForm" @submit=${submitFunc}>
            <img src=${image}>
            <div>
                <h2>Edit PetPal</h2>
                <div class="name">
                    <label for="name">Name:</label>
                    <input name="name" id="name" type="text" value=${name}>
                </div>
                <div class="breed">
                    <label for="breed">Breed:</label>
                    <input name="breed" id="breed" type="text" value=${breed}>
                </div>
                <div class="Age">
                    <label for="age">Age:</label>
                    <input name="age" id="age" type="text" value=${age}>
                </div>
                <div class="weight">
                    <label for="weight">Weight:</label>
                    <input name="weight" id="weight" type="text" value=${weight}>
                </div>
                <div class="image">
                    <label for="image">Image:</label>
                    <input name="image" id="image" type="text" value=${image}>
                </div>
                <button class="btn" type="submit">Edit Pet</button>
            </div>
        </form>
    </section>`
}

export const views = {
    viewDetails,
    homeView,
    loginView,
    registrationView,
    dashboardView,
    addPetView,
    editPetView,
    viewNavigation
}