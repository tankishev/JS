import { html } from '../node_modules/lit-html/lit-html.js';

export const views = {
    navigationView,
    loginView,
    registerView,
    dashboardView, 
    detailsView,
    editView,
    createView,
    myBooksView
};

function myBooksView(data){
    return html`
        <!-- My Books Page ( Only for logged-in users ) -->
        <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        ${loadBooks(data)}
    </section>`

function loadBooks(){
    if (data.length > 0){
    return html`
    <!-- Display ul: with list-items for every user's books (if any) -->
    <ul class="my-books-list">
        ${data.map(loadBook)}
    </ul>
    `
    } else {
        return html`
        <!-- Display paragraph: If there are no books in the database -->
        <p class="no-books">No books in database!</p>`
    }
}

function loadBook(bookData){
    const {title, type, imageUrl, _id, _ownerId} = bookData;
    return html`
    <li class="otherBooks" data-id=${_id} data-ownerId=${_ownerId}>
        <h3>${title}</h3>
        <p>Type: ${type}</p>
        <p class="img"><img src=${imageUrl}></p>
        <a class="button" href="/details/${_id}">Details</a>
    </li>`
}
}


function createView(onSubmit){
    return html`
    <!-- Create Page ( Only for logged-in users ) -->
    <section id="create-page" class="create">
        <form id="create-form" action="" method="" @submit=${onSubmit}>
            <fieldset>
                <legend>Add new Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" placeholder="Title">
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description" placeholder="Description"></textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" placeholder="Image">
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type">
                            <option value="Fiction">Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Add Book">
            </fieldset>
        </form>
    </section>`
}

function editView(data, onSubmit){
    const {title, description, imageUrl} = data;
    return html`
    <!-- Edit Page ( Only for the creator )-->
    <section id="edit-page" class="edit">
        <form id="edit-form" action="" method="", @submit=${onSubmit}>
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" value=${title}>
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description">${description}</textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" value=${imageUrl}>
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type" value="Fiction">
                            <option value="Fiction" selected>Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>`
}


function detailsView(data, funcs, boolIsOwner){
    const {title, description, type, imageUrl, likes} = data;
    return html`
    <!-- Details Page ( for Guests and Users ) -->
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${title}</h3>
            <p class="type">Type: ${type}</p>
            <p class="img"><img src=${imageUrl}></p>
            <div class="actions" >
                <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                ${boolIsOwner ? html`<a class="button" href="" @click=${funcs.edit}>Edit</a>` : ''}
                ${boolIsOwner ? html`<a class="button" href="" @click=${funcs.remove}>Delete</a>` : ''}
                <!-- Bonus -->
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                ${boolIsOwner ? '' : html`<a class="button" id="btnLike" href="" @click=${funcs.like}>Like</a>`}
                <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${likes}</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${description}</p>
        </div>
    </section>`

        // <!-- Bonus -->
        // <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
        // <a class="button" href="#">Like</a>


        // <!-- Bonus -->
}

function dashboardView(data){
    return html`
    <!-- Dashboard Page ( for Guests and Users ) -->
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        ${loadBooks()}
    </section>`

    function loadBooks(){
        if (data.length > 0){
        return html`
        <!-- Display ul: with list-items for All books (If any) -->
        <ul class="other-books-list">
            ${data.map(loadBook)}
        </ul>
        `
        } else {
            return html`
            <!-- Display paragraph: If there are no books in the database -->
            <p class="no-books">No books in database!</p>`
        }
    }

    function loadBook(bookData){
        const {title, type, imageUrl, _id, _ownerId} = bookData;
        return html`
        <li class="otherBooks" data-id=${_id} data-ownerId=${_ownerId}>
            <h3>${title}</h3>
            <p>Type: ${type}</p>
            <p class="img"><img src=${imageUrl}></p>
            <a class="button" href="/details/${_id}">Details</a>
        </li>`
    }
}


function registerView(onSubmit){
    return html`
    <!-- Register Page ( Only for Guest users ) -->
    <section id="register-page" class="register" @submit=${onSubmit}>
        <form id="register-form" action="" method="">
            <fieldset>
                <legend>Register Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                        <input type="text" name="email" id="email" placeholder="Email">
                    </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                        <input type="password" name="password" id="password" placeholder="Password">
                    </span>
                </p>
                <p class="field">
                    <label for="repeat-pass">Repeat Password</label>
                    <span class="input">
                        <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Register">
            </fieldset>
        </form>
    </section>`
}


function loginView(onSubmit){
    return html`
    <!-- Login Page ( Only for Guest users ) -->
    <section id="login-page" class="login" @submit=${onSubmit}>
        <form id="login-form" action="" method="">
            <fieldset>
                <legend>Login Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                        <input type="text" name="email" id="email" placeholder="Email">
                    </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                        <input type="password" name="password" id="password" placeholder="Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Login">
            </fieldset>
        </form>
    </section>`
};

function navigationView(email=null){
    return html`
    <!-- Navigation -->
    <nav class="navbar">
        <section class="navbar-dashboard">
            <a href="/home">Dashboard</a>
            ${buttons()}
        </section>
    </nav>`

    function buttons(){
        if (email == null){
            return html`
            <!-- Guest users -->
            <div id="guest">
                <a class="button" href="/login">Login</a>
                <a class="button" href="/register">Register</a>
            </div>`
        } else {
            return html`
            <!-- Logged-in users -->
            <div id="user">
                <span>Welcome, ${email}</span>
                <a class="button" href="/mybooks">My Books</a>
                <a class="button" href="/add">Add Book</a>
                <a class="button" href="/logout">Logout</a>
            </div>`
        }
    }
};


