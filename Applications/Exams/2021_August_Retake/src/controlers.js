export function loadControlers(page, onError) {

    return {
        navigation,
        home,
        login,
        register,
        logout,
        create,
        showAll, 
        showDetails
        // profile
    };

    function navigation(ctx, next){
        const {render, views, nav} = ctx;
        const userData = getUserData()
        render(views.navigation(userData), nav);
        next();
    };
    
    async function home(ctx, next){
        const {render, views, main, request} = ctx;
        const data = await request('readLatest');
        console.log(data);
        render(views.home(data), main);
    }
    
    function login(ctx, next){
        const {main, render, views, request} = ctx;
        render(views.login(onSubmit), main);
    
        async function onSubmit(ev){
            ev.preventDefault();
            try {
                const formData = getFormData('Please fill both email and password');
                if (formData == undefined){
                    throw new Error('From login: getFormData error');
                }    
                const {email, password} = formData;
                await request('login', {data:{email, password}});
                const {boolIsLogged} = getUserData();
                if (boolIsLogged){
                    next();
                }
            } catch (error) {
                onError(error);
            }
        }
    }
    
    function register(ctx, next){
        const {views, render, main, request} = ctx;
        render(views.register(onSubmit), main);
    
        async function onSubmit(ev){
            ev.preventDefault();
            try {
                const formData = getFormData('Please fill all fields');
                if (formData == undefined){
                    throw new Error('From register: getFormData error');
                };
                const {email, password} = formData;
                if (password != formData['confirm-password']){
                    throw new Error ('Passwords do not match');
                };
                await request('register', {data:{email, password}});
                const {boolIsLogged} = getUserData();
                if (boolIsLogged){
                    next();
                }
            } catch (error) {
                onError(error);
            }
        }
    }
    
    async function logout(ctx, next){
        const {boolIsLogged} = getUserData();
        if (boolIsLogged) {
            await ctx.request('logout');
        }
        next();
    }
    
    function create(ctx, next){
        const {render, main, views, request} = ctx;
        render(views.create(onSubmit), main);
    
        async function onSubmit(ev){
            ev.preventDefault();
            const {title, category, maxLevel, imageUrl, summary} = getFormData('Please fill all fields');
            const responseData = await request('create', {data:{title, category, maxLevel, imageUrl, summary}});
            next();
        }
    }
    
    async function showAll(ctx, next){
        const {main, views, render, request} = ctx;
        const data = await request('readAll');
        render(views.showAll(data, {onDetails}), main);
    
        function onDetails(ev, _id){
            ev.preventDefault();
            page(`/details/${_id}`);
        }
    }

    async function showDetails(ctx, next){
        const {request, render, main, views, params} = ctx;
        const itemId = params.itemId;
        let data = ctx.data;
        if (data == undefined){
            data = await request('readDetails', {reqIDs:{itemId}});
        };
        const userData = getUserData();
        userData['boolIsOwner'] = userData._id == data._ownerId;
        data['comments'] = await request('bonusReadItem', {reqIDs:{itemId}});
        render(views.showDetails(data, userData, {edit, remove, onSubmit}), main);

        function edit(ev){
            ev.preventDefault();
            render(views.update(data, {onSubmit}), main);

            async function onSubmit(ev){
                ev.preventDefault();
                const data = getFormData('Please fill all fields');
                if (data) {
                    const responseData = await request('update', {data, reqIDs:{itemId}});
                    ctx['data'] = responseData;
                }
                page(`/details/${itemId}`);
            }
        }

        function remove(ev){
            ev.preventDefault();
            request('remove', {reqIDs:{itemId}});
            next();
        }

        function onSubmit(ev){
            ev.preventDefault();
            const formData = getFormData('Cannot post empty comment');
            if (formData != undefined){
                request('bonusCreate', {data:{comment:formData.comment, gameId:itemId}});
                window.location.reload();
                document.querySelector('form').reset()
            }
        }
    }

    // async function profile(ctx, next){
    //     const {main, views, render, request} = ctx;
    //     const userData = getUserData();
    //     const userId = userData._id;
    //     let data = await request('readItemsByUser', {reqIDs:{userId}})
    //     render(views.profile(data, userData, {onDetails}), main);
    //     next();

    //     function onDetails(ev, _id){
    //         ev.preventDefault();
    //         page(`/details/${_id}`);
    //     }
    // }

    function getFormData(errorMessage){
        try {
            const form = document.querySelector('form');
            const formData = new FormData(form);
            const values = Array.from(formData.values());
            if (values.some(el => el == '')){
                throw new Error(errorMessage);
            }
            return Object.fromEntries(formData.entries());
        } catch (error) {
            onError(error);
        }
    }
    
    function getUserData(){
        const data = Object.assign({}, JSON.parse(sessionStorage.getItem('userData')));
        data['boolIsLogged'] = Object.keys(data).includes('accessToken');
        return data;
    }
}

