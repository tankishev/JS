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
    formRegister.addEventListener('submit', logIn);
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

// Registration for new user & login
async function logIn(e){
    e.preventDefault();
    const form = e.target;
    const url = `http://localhost:3030/users/${form.id}`;
    try {
        const formData = new FormData(form);
        if (form.id == 'register') {
            if (formData.get('password') != formData.get('rePass')){
                throw new Error('Passwords do not match');
            }
        }

        const credentials = {email: formData.get('email'), password: formData.get('password')};
        const res = await fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        });
    
        if (res.status != 200){
            const data = await res.json();
            throw new Error(`${data.code} ${data.message}`);
        }
    
        const {accessToken, email, _id, ...rest} = await res.json();
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('user_id',_id);
        userLoggedIn = true;
        console.log('Successful login');
        navigate('home');
        
    } catch (error) {
        alert(error.message);
        console.log(error.message);
    } finally {
        form.reset()
    }
}


// Log-out of user
async function logOut(){
    try {
        const res = await fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('accessToken')
            }
        });
        if (res.status == 204){
            sessionStorage.clear();
            userLoggedIn = false;
            console.log('Successful logout');
            navigate('home');
        } else {
            const data = await res.json();
            throw new Error(`${data.code} ${data.message}`);
        }
    } catch (error) {
        alert(error.message);
        console.log(error.message);
    }
}


// Read catch data and list
async function loadCatches(){
    try {
        const res = await fetch('http://localhost:3030/data/catches');
               
        if (res.status != 200){
            const data = await res.json();
            throw new Error(`${data.code} ${data.message}`);
        }
        
        catchList.innerHTML = '';
        const textNode = main.firstChild;
        if (textNode.nodeName == '#text'){
            textNode.remove();
        }
        fieldsetMain.style.display = 'inline';

        const data = await res.json();
        data.forEach(el => {
            let div = addCatch(el);
            catchList.appendChild(div);
        })
    } catch (error) {
        alert(error.message);
        console.log(error.message);
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
        try {
            const form = e.target;
            const url = `http://localhost:3030/data/catches`;
            const formData = new FormData(form);
            if (Array.from(formData.values()).some(el => el == '')){
                throw new Error ('Please fill all fields before posting');
            }
            const body = (Object.fromEntries(formData.entries()));
            body._ownerId = sessionStorage.getItem('user_id');
            const res = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.getItem('accessToken')
                },
                body: JSON.stringify(body)
            });

            if (res.status != 200){
                const data = await res.json();
                throw new Error(`${data.code} ${data.message}`);
            }
            const data = await res.json();
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
            const id = e.target['data-id'];
            const type = e.target.className; 
            const card = e.currentTarget;
            const url = `http://localhost:3030/data/catches/${id}`
            
            if (type == 'delete'){
                const res = await fetch(url, {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': sessionStorage.getItem('accessToken')
                    }
                });    
                if (res.status != 200){
                    const data = await res.json();
                    throw new Error(`${data.code} ${data.message}`);
                }
                card.remove();                
            } else if (type == 'update') {
                
                const body = Object.fromEntries(Array.from(card.querySelectorAll('input')).map(el => [el.className, el.value]));
                const res = await fetch(url, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': sessionStorage.getItem('accessToken')
                    },
                    body: JSON.stringify(body)
                });    
                if (res.status != 200){
                    const data = await res.json();
                    throw new Error(`${data.code} ${data.message}`);
                }
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
