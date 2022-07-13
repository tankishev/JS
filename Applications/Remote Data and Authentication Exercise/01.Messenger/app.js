const messages = document.getElementById('messages');
const baseUrl = 'http://localhost:3030/jsonstore/messenger';

function attachEvents() {
    document.getElementById('refresh').addEventListener('click', loadMessages);
    document.getElementById('submit').addEventListener('click', sendMessage);
}

async function sendMessage(){
    const author = document.querySelector('input[name="author"]');
    const content = document.querySelector('input[name="content"]');

    if (author && content){
        try {
            const res = await fetch(baseUrl, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    author: author.value, 
                    content: content.value
                })
            })
            if (!res.ok){
                throw new Error(`${res.status} ${res.statusText}`);
            }
            const data = await res.json()
            messages.textContent += `\n${author.value}: ${content.value}`;
            author.value = '';
            content.value = '';
        } catch (error) {
            console.log(error.message);
        }
    }
}

async function loadMessages(){
    try {
        const res = await fetch(baseUrl);
        if (!res.ok){
            throw new Error(`${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        messages.innerHTML = '';
        messages.textContent = Object.values(data)
            .map(el => `${el.author}: ${el.content}`)
            .join('\n')
    } catch (error) {
        console.log(error.message);
    }
}

attachEvents();