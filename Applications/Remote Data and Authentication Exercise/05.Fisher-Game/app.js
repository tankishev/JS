import { request } from './requests.js'

let userLoggedIn = !(sessionStorage.getItem('user_id') == null);
const main = document.querySelector('main');
const views = document.getElementById('views');
const catchList = document.querySelector('fieldset#main div#catches');
const fieldsetMain = document.querySelector('fieldset#main');
const formLogin = document.querySelector('form#login');
const formRegister = document.querySelector('form#register');
const formAddCatch = document.querySelector('form#addForm');
const loadBtn = document.querySelector('button.load')
const navBtns = document.querySelectorAll('nav a');

// Load
function onLoad(){
    views.style.display = 'none';
    catchList.innerHTML = '';
    attachListeners();
    navigate('home');
}
onLoad()

// Assignment of Event Listeners
function attachListeners(){
    formLogin.addEventListener('submit', logIn);
    formRegister.addEventListener('submit', register);
    formAddCatch.addEventListener('submit', addNewCatch);
    loadBtn.addEventListener('click', loadCatches);
    navBtns.forEach(btn => {
        if (btn.id == 'logout'){
            btn.addEventListener('click', logOut);
        } else {
            btn.addEventListener('click', () => navigate(btn.id));
        }
    });
}


// Navigation
function navigate(tabName){
    const activeButtons = userLoggedIn ? ['home', 'logout'] : ['home', 'login', 'register'];
    navBtns.forEach(btn =>{
        if (btn.id == tabName){
            btn.className = 'active';
        } else {
            btn.classList.remove('active');
        };
        btn.style.display = activeButtons.includes(btn.id) ? 'inline' : 'none';
    });    

    Array.from(main.children).forEach(el => views.appendChild(el));
    main.innerHTML = ''   

    if (tabName == 'login'){
        main.appendChild(document.getElementById('login-view'));
    } else if (tabName == 'register'){
        main.appendChild(document.getElementById('register-view'));
    } else if (tabName == 'home'){
        const homeView = document.getElementById('home-view');
        main.appendChild(homeView);
        const userEmail = sessionStorage.getItem('email');
        const emailField = document.querySelector('p.email span');
        emailField.textContent = userLoggedIn ? userEmail : 'guest'; 

        homeView.insertAdjacentText('beforebegin', 'Click to load catches');
        fieldsetMain.style.display = 'none';

        formAddCatch.querySelector('button.add').disabled = !userLoggedIn;
    }
}

// Registration for new user
async function register(e){
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const values = Array.from(formData.values())
    const data = Object.fromEntries(formData.entries())
    try {
        if (values.some(v => v == '')){
            throw new Error('All fields must be filled')
        }
        if (data.password != data.rePass){
            throw new Error('Passwords do not match');
        } 
        delete data.rePass;
        await request('register', {data})
        if (sessionStorage.getItem('accessToken')){
            userLoggedIn = true;
            console.log('Successful registration');
            navigate('home');   
        }
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    } finally {
        form.reset()
    }
}

// login
async function logIn(e){
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries())

    try {
        if (data.password == '' || data.email == ''){
            throw new Error('Email and password cannot be empty')
        }  
        await request('login', {data});
        if (sessionStorage.getItem('accessToken')){
            userLoggedIn = true;
            console.log('Successful login');
            navigate('home');   
        }
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    } finally {
        form.reset()
    }
}

// Log-out of user
async function logOut(){
    await request('logout')
    if (!sessionStorage.getItem('accessToken')){
        userLoggedIn = false;
        console.log('Successful logout');
        navigate('home');
    }
}

// Read catch data and list
async function loadCatches(){
    const data = await request('getAllCatches');      
    if (data) {
        catchList.innerHTML = '';
        const textNode = main.firstChild;
        if (textNode.nodeName == '#text'){
            textNode.remove();
        }
        fieldsetMain.style.display = 'inline';
    
        // const data = await res.json();
        data.forEach(el => {
            let div = addCatch(el);
            catchList.appendChild(div);
        })
    }
}

// Create card for each catch
function addCatch(data){
    const result = e('div', {className: 'catch'},
        e('label',{}, 'Angler'),
        e('input',{type: 'text', className: 'angler', value: data.angler}),
        e('label',{}, 'Weight'),
        e('input',{type: 'text', className: 'weight', value: data.weight}),
        e('label',{}, 'Species'),
        e('input',{type: 'text', className: 'species', value: data.species}),
        e('label',{}, 'Location'),
        e('input',{type: 'text', className: 'location', value: data.location}),
        e('label',{}, 'Bait'),
        e('input',{type: 'text', className: 'bait', value: data.bait}),
        e('label',{}, 'Capture Time'),
        e('input',{type: 'number', className: 'captureTime', value: data.captureTime}),
        e('button',{className: 'update', "data-id": data._id, disabled: true}, 'Update'),
        e('button',{className: 'delete', "data-id": data._id, disabled: true}, 'Delete')
    )

    if (data._ownerId == sessionStorage.getItem('user_id')){
        result.querySelectorAll('button').forEach(el => el.disabled = false);
    }
    result.addEventListener('click', updateCatch);
    return result;
}


// Add data by registered user
async function addNewCatch(e){
    e.preventDefault();
    if (userLoggedIn){
        const form = e.target;
        const formData = new FormData(form);
        try {
            if (Array.from(formData.values()).some(el => el == '')){
                throw new Error ('Please fill all fields before posting');
            }

            const body = (Object.fromEntries(formData.entries()));
            body._ownerId = sessionStorage.getItem('user_id');
            const data = await request('addCatch', {data: body});
            formAddCatch.reset();

            if (fieldsetMain.style.display == 'inline'){
                const newCatch = addCatch(data);
                catchList.appendChild(newCatch);
            }

        } catch (error) {
            alert(error.message);
            console.log(error.message);
        }
    }
}

// Modify data by registered user
async function updateCatch(e){
    if (e.target.tagName == 'BUTTON' && userLoggedIn){
        try {
            const _id = e.target['data-id'];
            const type = e.target.className; 
            const card = e.currentTarget;
            
            if (type == 'delete'){
                await request('deleteCatch', {_id});
                card.remove();                
            } else if (type == 'update') {
                const data = Object.fromEntries(Array.from(card.querySelectorAll('input')).map(el => [el.className, el.value]));
                await request('updateCatch', {data, _id});
            }
        } catch (error) {
            alert(error.message);
            console.log(error.message);
        }
    }
}

// Support functions
function e(type, attributes, ...elements){
    const result = document.createElement(type);

    for (const [attribute, value] of Object.entries(attributes || {})){
        result[attribute] = value;
    }

    for (const el of (elements || [])){
        if (typeof el == 'string' || typeof el == 'number'){
            result.innerHTML = el;
        } else {
            result.appendChild(el);
        }
    }
    return result;
}
