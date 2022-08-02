import page from '../node_modules/page/page.mjs';

export const controlers = {
    loadLogin,
    logout,
    loadAddBook,
    loadHome,
    loadMyBooks,
    loadNav,
    loadRegister,
    loadDetails
}

function loadAddBook(ctx, next){
    const {render, main, views, request} = ctx;
    render(views.createView(onSubmit), main);

    async function onSubmit(ev){
        ev.preventDefault();
        const form = document.querySelector('form');
        const formData = new FormData(form);
        try {
            if (Array.from(formData.values()).some(el => el == '')){
                throw new Error('Please fill all fields');
            }
            const data = Object.fromEntries(formData.entries());
            const responseData = await request('createBook', {data});
            next();
        } catch (error) {
            alert(error.message);
        }
    }
}

function loadNav(ctx, next){
    const {views, render, nav} = ctx;
    const email = sessionStorage.getItem('email');
    render(views.navigationView(email), nav);
    next();
}

async function loadHome(ctx, next){
    const {views, main, render, request} = ctx;
    const data = await request('loadBooks');
    render(views.dashboardView(data), main);
}

async function loadMyBooks(ctx, next){
    const {views, main, render, request} = ctx;
    const userId = sessionStorage.getItem('user_id')
    const data = await request('loadMyBooks', {reqIDs:{userId}});
    render(views.myBooksView(data), main);
}

async function loadDetails(ctx, next){
    const {views, main, render, request, params} = ctx;
    const bookId = params.bookId;
    const [bookData, likes] = await Promise.all([
        request('getBook', {reqIDs:{bookId}}),
        request('getLikes', {reqIDs:{bookId}})
    ]);
    bookData['likes'] = likes;
    const userId = sessionStorage.getItem('user_id');
    const boolIsOwner = (bookData._ownerId == userId);

    const funcs = {
        edit: (ev) => {
            ev.preventDefault();
            render(views.editView(bookData, onSubmit), main);

            async function onSubmit(ev){
                ev.preventDefault();
                const form = document.querySelector('form');
                const formData = new FormData(form);
                try {
                    if (Array.from(formData.values()).some(el => el == '')){
                        throw new Error('Please fill all fields');
                    }
                    const data = Object.fromEntries(formData.entries());
                    const responseData = await request('editBook', {data, reqIDs:{bookId}});
                    window.location.pathname = `/details/${bookId}`;
                } catch (error) {
                    alert(error.message);
                }
            }
        },
        remove: (ev) => {
            ev.preventDefault();
            if (confirm('Are you sure you want to delete this book?')){
                request('deleteBook', {reqIDs:{bookId}});
                page('/home');
            }
        },
        like : async (ev) => {
            ev.preventDefault();
            const totalLikes = document.getElementById('total-likes');
            const btnLike = document.getElementById('btnLike');
            
            const res = await request('like', {data:{bookId}});
            console.log(res);

            if (Object.keys(res).length > 0){
                let likes = Number(totalLikes.textContent.split(' ')[1]);
                likes += 1;
                totalLikes.textContent = `Likes: ${likes}`;
                btnLike.remove();
            }
        }
    }

    render(views.detailsView(bookData, funcs, boolIsOwner), main);
    if (userId == null ){
        document.getElementById('btnLike').remove();

    } else {
        const userLikes = await request('getUserLikes', {reqIDs:{bookId, userId}})
        if (userLikes > 0){
            document.getElementById('btnLike').remove();
        }
    }
}

function loadRegister(ctx, next){
    const {views, render, main, request} = ctx;
    render(views.registerView(onSubmit), main);

    async function onSubmit(ev){
        ev.preventDefault();
        const form = document.querySelector('form');
        try {
            const formData = new FormData(form);
            const values = Array.from(formData.values());
            if (values.some(v => v =='')){
                throw new Error('All fields are required');
            };
            const regData = Object.fromEntries(formData.entries());
            if (regData["confirm-pass"] != regData['password']){
                throw new Error('Passwords do not match');
            }
            const {email, password} = regData;
            await request('register', {data:{email, password}});
            next();
        } catch (error) {
            alert(error.message);
        } finally {
            form.reset();
        }
    }
}

function loadLogin(ctx, next){
    const {views, render, main, request} = ctx;
    render(views.loginView(onSubmit), main);
    
    async function onSubmit(ev){
        ev.preventDefault();
        const form = document.querySelector('form');
        try {
            const formData = new FormData(form);
            const values = Array.from(formData.values());
            if (values.some(v => v =='')){
                throw new Error('Please fill both email and password');
            };
            const data = Object.fromEntries(formData.entries());
            await request('login', {data});
            next();
        } catch (error) {
            alert(error.message);
        } finally {
            form.reset();
        }
    }
}

function logout(ctx, next){
    const userId = sessionStorage.getItem('user_id');
    if (userId != null){
        const {request} = ctx;
        request('logout');
    }
    next();
}