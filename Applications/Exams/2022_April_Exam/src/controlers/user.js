export async function logout(ctx, next){
    if (sessionStorage.getItem('accessToken')){
        const data = await ctx.request('logout');
    }
    window.location.pathname = '/home';
}

export async function login(ctx, next){
    const { views, render, main, request, ...rest} = ctx;
    render(views.loginView(onSubmit), main);

    async function onSubmit(ev){
        ev.preventDefault();
        const formData = new FormData(document.querySelector('form'));
        try {
            if (Array.from(formData.values()).includes('')){
                throw new Error('Please provide both username and password');
            }
            const loginData = Object.fromEntries(formData.entries());
            const logData = await request('login', {data: loginData});
            if (sessionStorage.getItem('accessToken')){
                window.location.pathname = '/home';
            }
        } catch (error) {
            alert(error.message);
        }
    }
}

export async function register(ctx, next){
    const { views, render, main, request, ...rest} = ctx;
    render(views.registrationView(onSubmit), main);

    async function onSubmit(ev){
        ev.preventDefault();
        const formData = new FormData(document.querySelector('form'));
        try {
            if (Array.from(formData.values()).includes('')){
                throw new Error('Please fill all fields');
            }
            const userData = Object.fromEntries(formData.entries());
            if (userData.password != userData.repeatPassword){
                throw new Error('Passwords do not match')
            }
            const { email, password, ...rest } = userData;
            const data = {email, password}
            const logData = await request('register', {data});
            if (sessionStorage.getItem('accessToken')){
                window.location.pathname = '/home';
            }
        } catch (error) {
            alert(error.message);
        }
    }
}