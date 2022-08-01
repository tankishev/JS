import { html } from '../node_modules/lit-html/lit-html.js';

function navigation(userData){
    const {boolIsLogged, email} = userData
    return html`
    <a href="/memes">All Memes</a>
    ${boolIsLogged ? userNav() : guestNav()}`

    function userNav(){
        return html`
        <!-- Logged users -->
        <div class="user">
            <a href="/create">Create Meme</a>
            <div class="profile">
                <span>Welcome, ${email}</span>
                <a href="/profile">My Profile</a>
                <a href="/logout">Logout</a>
            </div>
        </div>`
    }

    function guestNav(){
        return html`
         <!-- Guest users -->
        <div class="guest">
            <div class="profile">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
            <a class="active" href="/home">Home Page</a>
        </div>`
    }
}

function home(){
    return html`
    <!-- Welcome Page ( Only for guest users ) -->
    <section id="welcome">
        <div id="welcome-container">
            <h1>Welcome To Meme Lounge</h1>
            <img src="/images/welcome-meme.jpg" alt="meme">
            <h2>Login to see our memes right away!</h2>
            <div id="button-div">
                <a href="/login" class="button">Login</a>
                <a href="/register" class="button">Register</a>
            </div>
        </div>
    </section>`
}

function login(onSubmit){
    return html`
    <!-- Login Page ( Only for guest users ) -->
    <section id="login">
        <form id="login-form" @submit=${onSubmit}>
            <div class="container">
                <h1>Login</h1>
                <label for="email">Email</label>
                <input id="email" placeholder="Enter Email" name="email" type="text">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn button" value="Login">
                <div class="container signin">
                    <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                </div>
            </div>
        </form>
    </section>`
}

function register(onSubmit){
    return html`
    <!-- Register Page ( Only for guest users ) -->
    <section id="register">
        <form id="register-form" @submit=${onSubmit}>
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="/login">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>`
}

function create(onSubmit){
    return html`
    <!-- Create Meme Page ( Only for logged users ) -->
    <section id="create-meme" @submit=${onSubmit}>
        <form id="create-form">
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>`
}

function showAll(data, funcs){
    return html`
    <!-- All Memes Page ( for Guests and Users )-->
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            ${data.map(el => itemView(el, funcs))};
            ${data.length == 0 ? html`<p class="no-memes">No memes in database.</p>` : ''};
        </div>
    </section>`
}

function itemView(data, funcs){
    const { title, imageUrl, _id } = data;
    const { onDetails } = funcs;
    return html`
    <div class="meme" data-id=${_id}>
        <div class="card">
            <div class="info">
                <p class="meme-title">${title}</p>
                <img class="meme-image" alt="meme-img" src=${imageUrl}>
            </div>
            <div id="data-buttons">
                <a class="button" href="" @click=${(ev) => onDetails(ev, _id)}>Details</a>
            </div>
        </div>
    </div>`
}

function showDetails(data, userData, funcs){
    const { title, description, imageUrl } = data;
    const { edit, remove } = funcs;
    const { boolIsOwner } = userData;
    return html`
    <!-- Details Meme Page (for guests and logged users) -->
    <section id="meme-details">
        <h1>Meme Title: ${title}
        </h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${imageUrl}>
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>
                    ${description}
                </p>
                <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                ${boolIsOwner ? html`<a class="button warning" href="" @click=${edit}>Edit</a>` : ''}
                ${boolIsOwner ? html`<button class="button danger" @click=${remove}>Delete</button>` : ''}
            </div>
        </div>
    </section>`
}

function update(data, funcs){
    const {title, description, imageUrl} = data;
    const { onSubmit } = funcs;
    return html`
    <!-- Edit Meme Page ( Only for logged user and creator to this meme )-->
    <section id="edit-meme">
        <form id="edit-form" @submit=${onSubmit}>
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" value=${title}>
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description">${description}</textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value=${imageUrl}>
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>`
}

function profile(data, userData, funcs){
    const { username, email, gender } = userData;
    const { onDetails } = funcs
    return html`
    <!-- Profile Page ( Only for logged users ) -->
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/${gender}.png">
            <div class="user-content">
                <p>Username: ${username}</p>
                <p>Email: ${email}</p>
                <p>My memes count: ${data.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            <!-- Display : All created memes by this user (If any) --> 
            ${data.map(el => {
                return html`
                <div class="user-meme">
                    <p class="user-meme-title">${el.title}</p>
                    <img class="userProfileImage" alt="meme-img" src=${el.imageUrl}>
                    <a class="button" href="" @click=${ev => onDetails(ev, el._id)}>Details</a>
                </div>`
            })}
            <!-- Display : If user doesn't have own memes  --> 
            ${data.length == 0 ? html`<p class="no-memes">No memes in database.</p>` : ''}
        </div>
    </section>`
}

export const views = {
    navigation,
    home,
    login, 
    register,
    create,
    showAll,
    showDetails,
    update,
    profile
};