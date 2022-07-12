async function lockedProfile() {
    const main = document.getElementById('main');

    const res = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const data = await res.json();

    main.innerHTML = '';
    let i = 1;
    for (key in data){
        const {email, age, username} = data[key];
        let profile = createProfile({id: i, email, age, username});
        main.appendChild(profile);
        i++;
    }
}

function onClick(e){
    if (e.target.tagName == 'BUTTON'){
        let isLocked = e.currentTarget.querySelector('input[type="radio"][value="lock"]').checked;
        if(!isLocked){
            let dv = e.currentTarget.querySelector('div[id*="HiddenFields"]');
            if(e.target.textContent == 'Show more'){
                dv.style.display = 'block';
                e.target.textContent = 'Hide it'
            } else {
                dv.style.display = 'none';
                e.target.textContent = 'Show more'
            }   
        }
    }
}

function createProfile(data){
    const {id, email, age, username} = data;
    const card = e('div', {className: 'profile'},
        e('img', {src: './iconProfile2.png', className: 'userIcon'}),
        e('label', {}, 'Lock'),
        e('input', {type: 'radio', name: `user${id}Locked`, value: 'lock', checked: true}),
        e('label', {}, 'Unlock'),
        e('input', {type: 'radio', name: `user${id}Locked`, value: 'unlock'}), e('br',{}),
        e('hr', {}),
        e('label', {}, 'Username'),
        e('input', {type: 'text', name: `user${id}Username`, value: username, disabled: true, readonly: true}),
        e('div', {id: `user${id}HiddenFields`, style: "display:none"},
            e('hr', {}),
            e('label', {}, 'Email:'),
            e('input', {type: 'email', name: `user${id}Email`, value: email, disabled: true, readonly: true}),
            e('label', {}, 'Age:'),
            e('input', {type: 'email', name: `user${id}Age`, value: age, disabled: true, readonly: true})
        ),
        e('button', {}, 'Show more')
    )
    card.addEventListener('click', onClick);
    return card;
}

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
