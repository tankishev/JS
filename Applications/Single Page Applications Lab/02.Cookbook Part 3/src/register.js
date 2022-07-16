import { navigate } from "./nav.js";
export { onSubmit };

async function onSubmit(input) {
    if (input.password != input.rePass) {
        return console.error('Passwords don\'t match');
    }

    const url = 'http://localhost:3030/users/register';
    const init = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: input.email,
            password: input.password
        })
    };
    try {
        const res = await fetch(url, init);
        const data = await res.json();
        if (res.status != 200) {
            throw new Error(data.message);
        }
        sessionStorage.setItem('authToken', data.accessToken);
        console.log('Registration successful');
        navigate('catalog');
    } catch (err) {
        console.log(err.message);
    };
}