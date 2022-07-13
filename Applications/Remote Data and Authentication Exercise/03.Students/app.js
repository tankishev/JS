function onLoad(){
    loadStudents();
    document.getElementById('form').addEventListener('click', onSubmit);
    
}

async function onSubmit(e){
    e.preventDefault();
    if (e.target.id == 'submit') {
        const formData = new FormData(e.currentTarget);
        const body = {
            firstName: formData.get('firstName'), 
            lastName: formData.get('lastName'), 
            facultyNumber: formData.get('facultyNumber'), 
            grade: formData.get('grade')
        }
        if (Object.values(body).every(el => el != '')){
            try {
                console.log(body)
                const url = 'http://localhost:3030/jsonstore/collections/students';
                const res = await fetch(url,{
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(body)
                });
                if(!res.ok){
                    throw new Error(`${res.status} ${res.statusText}`);
                }
                
                const data = await res.json();
                addStudent(data);
                document.getElementById('form').reset();
                
            } catch (error) {
                console.log(error.message);
            }
        } else {
            console.log("All fields required");
        } 
    }
}

async function loadStudents(){
    try {
        const url = 'http://localhost:3030/jsonstore/collections/students';
        const tbody = document.querySelector('tbody');

        const res = await fetch(url);
        if(!res.ok){
            throw new Error(`${res.status} ${res.statusText}`);
        }
        tbody.innerHTML = '';
        const data = await res.json();
        Object.values(data).forEach(el => addStudent(el));
    } catch (error) {
        console.log(error.message);
    }
}

function addStudent(data){
    const tbody = document.querySelector('tbody');
    const tr = document.createElement('tr');          
    const {firstName, lastName, facultyNumber, grade} = data;

    [firstName, lastName, facultyNumber, grade].forEach(el => {
        let td = document.createElement('td');
        td.textContent = el;
        tr.appendChild(td);
    })
    tbody.appendChild(tr);
}

onLoad();