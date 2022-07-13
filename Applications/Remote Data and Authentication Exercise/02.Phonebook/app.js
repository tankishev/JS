function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadEntries);
    document.getElementById('btnCreate').addEventListener('click', createEntry);
}

async function createEntry(){
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const person = document.getElementById('person');
    const phone = document.getElementById('phone');

    if (person.value && phone.value){
        try {
            const body = {person: person.value, phone: phone.value};
            const res = await fetch(url, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });
            if (!res.ok){
                throw new Error(`${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            addEntry(data);
        } catch (error) {
            console.log(error.message);
        } finally {
            person.value = '';
            phone.value = '';  
        }
    }
}

function addEntry(entry){
    console.log(entry);
    const ul = document.getElementById('phonebook');

    let btn = document.createElement("button");
    btn.textContent = 'Delete';
    btn.addEventListener('click', () => deleteEntry(entry._id));

    let li = document.createElement('li');
    li.id = entry._id;
    li.textContent = `${entry.person}: ${entry.phone}`;
    li.appendChild(btn);
    ul.appendChild(li);
}

async function loadEntries(){
    try {
        const ul = document.getElementById('phonebook');
        const url = 'http://localhost:3030/jsonstore/phonebook';

        const res = await fetch(url);
        if (!res.ok){
            throw new Error(`${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        ul.innerHTML = '';
        Object.values(data).map(el => addEntry(el))
    } catch (error) {
        console.log(error.message);
    }
    
}

async function deleteEntry(id){
    try {
        const url = `http://localhost:3030/jsonstore/phonebook/${id}`;
        const res = await fetch(url, {method: 'delete'});
        if(!res.ok){
            throw new Error(`${res.status} ${res.statusText}`);
        }
        document.getElementById(id).remove();
    } catch (error) {
        console.log(error.message);
    }
}

attachEvents();