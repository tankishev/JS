import { html } from '../node_modules/lit-html/lit-html.js';

function navigation(userData){
    const {boolIsLogged, email} = userData
    return html`
    <a href="/games">All games</a>
    ${boolIsLogged ? userNav() : guestNav()}`

    function userNav(){
        return html`
        <!-- Logged-in users -->
        <div id="user">
            <a href="/create">Create Game</a>
            <a href="/logout">Logout</a>
        </div>`
    }

    function guestNav(){
        return html`
        <!-- Guest users -->
        <div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>`
    }
}

function home(data){
    return html`
    <!--Home Page-->
    <section id="welcome-world">

        <div class="welcome-message">
            <h2>ALL new games are</h2>
            <h3>Only in GamesPlay</h3>
        </div>
        <img src="./images/four_slider_img01.png" alt="hero">

        <div id="home-page">
            <h1>Latest Games</h1>
            ${data.map(gameData => {
                return html`
                <div class="game">
                    <div class="image-wrap">
                        <img src=${gameData.imageUrl}>
                    </div>
                    <h3>${gameData.title}</h3>
                    <div class="rating">
                        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                    </div>
                    <div class="data-buttons">
                        <a href="/details/${gameData._id}" class="btn details-btn">Details</a>
                    </div>
                </div>`
            })}
            ${data.length == 0 ? html`<p class="no-articles">No games yet</p>` : ''}
        </div>
    </section>`
}

function login(onSubmit){
    return html`
    <section id="login-page" class="auth" @submit=${onSubmit}>
        <form id="login">
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Login</h1>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                <label for="login-pass">Password:</label>
                <input type="password" id="login-password" name="password">
                <input type="submit" class="btn submit" value="Login">
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </div>
        </form>
    </section>`
}

function register(onSubmit){
    return html`
    <!-- Register Page ( Only for Guest users ) -->
    <section id="register-page" class="content auth" @submit=${onSubmit}>
        <form id="register">
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Register</h1>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com">

                <label for="pass">Password:</label>
                <input type="password" name="password" id="register-password">

                <label for="con-pass">Confirm Password:</label>
                <input type="password" name="confirm-password" id="confirm-password">

                <input class="btn submit" type="submit" value="Register">

                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </div>
        </form>
    </section>`
}

function create(onSubmit){
    return html`
    <!-- Create Page ( Only for logged-in users ) -->
    <section id="create-page" class="auth" @submit=${onSubmit}>
        <form id="create">
            <div class="container">

                <h1>Create Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" placeholder="Enter game title...">

                <label for="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter game category...">

                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary"></textarea>
                <input class="btn submit" type="submit" value="Create Game">
            </div>
        </form>
    </section>`
}

function showAll(data, funcs){
    return html`
    <!-- Catalogue -->
    <section id="catalog-page">
        <h1>All Games</h1>
        <!-- Display div: with information about every game (if any) -->
        <div class="allGames">
            ${data.map(el => itemView(el, funcs))};
            ${data.length == 0 ? html`<h3 class="no-articles">No articles yet</h3>` : ''};
        </div>
    </section>`
}

function itemView(data, funcs){
    const { title, imageUrl, _id, category } = data;
    const { onDetails } = funcs;
    return html`
    <div class="allGames" data-id=${_id}>
        <div class="allGames-info">
            <img src=${imageUrl}>
            <h6>${category}</h6>
            <h2>${title}</h2>
            <a href="" class="details-button" @click=${(ev) => onDetails(ev, _id)}>Details</a>
        </div>
    </div>`
}

function showDetails(data, userData, funcs){
    const { title, category, maxLevel, imageUrl, summary, comments } = data;
    const { edit, remove, onSubmit } = funcs;
    const { boolIsOwner, boolIsLogged } = userData;
    console.log(userData);
    return html`
    <!--Details Page-->
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">

            <div class="game-header">
                <img class="game-img" src=${imageUrl} />
                <h1>${title}</h1>
                <span class="levels">MaxLevel: ${maxLevel}</span>
                <p class="type">${category}</p>
            </div>

            <p class="text">
                ${summary}
            </p>

            <!-- Bonus ( for Guests and Users ) -->
            <div class="details-comments">
                <h2>Comments:</h2>
                ${showComments()}
            </div>
            ${showButtons()}
        </div>
        ${showAddComment()}
    </section>`

    function showButtons(){
        if (boolIsOwner){
            return html`
            <!-- Edit/Delete buttons ( Only for creator of this game )  -->
            <div class="buttons">
                <a href="" class="button" @click=${edit}>Edit</a>
                <a href="" class="button" @click=${remove}>Delete</a>
            </div>`;
        } else {
            return '';
        }
    }

    function showComments(){
        if (comments.length > 0){
            return html`
            <ul>
                <!-- list all comments for current game (If any) -->
                ${comments.map(el => {
                    return html`
                    <li class="comment">
                        <p>Content: ${el.comment}</p>
                    </li>`
                })}
            </ul>`
        } else {
            return html`
            <!-- Display paragraph: If there are no games in the database -->
            <p class="no-comment">No comments.</p>`
        }
    }

    function showAddComment(){
        if (boolIsLogged && !boolIsOwner){
            return html`
            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
            <article class="create-comment">
                <label>Add new comment:</label>
                <form class="form" @submit=${onSubmit}>
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>`            
        }
    }
}

function update(data, funcs){
    const {title, category, maxLevel, imageUrl, summary} = data;
    const { onSubmit } = funcs;
    return html`
    <!-- Edit Page ( Only for the creator )-->
    <section id="edit-page" class="auth" @submit=${onSubmit}>
        <form id="edit">
            <div class="container">

                <h1>Edit Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" value=${title}>

                <label for="category">Category:</label>
                <input type="text" id="category" name="category" value=${category}>

                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" value=${maxLevel}>

                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" value=${imageUrl}>

                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary">${summary}</textarea>
                <input class="btn submit" type="submit" value="Edit Game">

            </div>
        </form>
    </section>`
}

// function profile(data, userData, funcs){
//     const { username, email, gender } = userData;
//     const { onDetails } = funcs
//     return html`
//     <!-- Profile Page ( Only for logged users ) -->
//     <section id="user-profile-page" class="user-profile">
//         <article class="user-info">
//             <img id="user-avatar-url" alt="user-profile" src="/images/${gender}.png">
//             <div class="user-content">
//                 <p>Username: ${username}</p>
//                 <p>Email: ${email}</p>
//                 <p>My memes count: ${data.length}</p>
//             </div>
//         </article>
//         <h1 id="user-listings-title">User Memes</h1>
//         <div class="user-meme-listings">
//             <!-- Display : All created memes by this user (If any) --> 
//             ${data.map(el => {
//                 return html`
//                 <div class="user-meme">
//                     <p class="user-meme-title">${el.title}</p>
//                     <img class="userProfileImage" alt="meme-img" src=${el.imageUrl}>
//                     <a class="button" href="" @click=${ev => onDetails(ev, el._id)}>Details</a>
//                 </div>`
//             })}
//             <!-- Display : If user doesn't have own memes  --> 
//             ${data.length == 0 ? html`<p class="no-memes">No memes in database.</p>` : ''}
//         </div>
//     </section>`
// }

export const views = {
    navigation,
    home,
    login, 
    register,
    create,
    showAll,
    showDetails,
    update,
    // profile
};