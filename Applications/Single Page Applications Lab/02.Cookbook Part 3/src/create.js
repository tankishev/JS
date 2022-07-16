import { navigate } from "./nav.js";
export { onSubmit };

async function onSubmit(input) {
    console.log('from Create on submit')
    const body = JSON.stringify({
        name: input.name,
        img: input.img,
        ingredients: input.ingredients.split('\n').map(l => l.trim()).filter(l => l != ''),
        steps: input.steps.split('\n').map(l => l.trim()).filter(l => l != '')
    });

    const token = sessionStorage.getItem('authToken');
    if (token == null) {
        return window.location.pathname = 'index.html';
    }

    try {
        const response = await fetch('http://localhost:3030/data/recipes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body
        });
        
        if (response.status == 200) {
            navigate('catalog');
        } else {
            throw new Error(await response.json());
        }
    } catch (err) {
        console.error(err.message);
    }
}