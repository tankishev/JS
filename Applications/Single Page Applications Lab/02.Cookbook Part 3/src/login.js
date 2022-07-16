import { navigate } from "./nav.js";
export { onSubmit, logout };

const baseUrl = 'http://localhost:3030/users';

async function onSubmit(input) {
    const init = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: input.email,
            password: input.password
        })
    }
    try {
        const res = await fetch(`${baseUrl}/login`, init);
        const data = await res.json();        
        if (res.status != 200) {
            throw new Error(data.message);
        }
        sessionStorage.setItem('authToken', data.accessToken);
        console.log('Login successful');
        navigate('catalog');
    } catch (err) {
        console.log(err.message);
    }
}
    
async function logout() {
    const init = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken')
        }
    }
    try {
        const res = await fetch(`${baseUrl}/logout`, init);
    
        if (res.status != 204) {
            const data = await res.json();
            throw new Error(data.message);
        }
        console.log('Logout successful');
        sessionStorage.clear();
    } catch (err) {
        console.log(err.message);
    }
    navigate('catalog');
}