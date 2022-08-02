export async function loadView(ctx, next){
    const { main, render, request, views, goTo } = ctx;
    const petId = ctx.params.petId;
    const userId = sessionStorage.getItem('user_id');
    let [data, donations] = await Promise.all([
        request('getPet', {reqIDs: {petId}}),
        request('donations', {reqIDs: {petId}})
    ]);
    const boolIsUser = userId != null;
    const boolIsOwner = data._ownerId == userId;
    let boolCanDonate = false;
    
    if (boolIsUser){
        const donationsUser = await request('donationsUser', {reqIDs: {petId, userId}});
        boolCanDonate = donationsUser == 0;
    }
    donations *= 100;
    data = Object.assign(data, {boolIsUser, boolIsOwner, boolCanDonate, donations});

    const funcs = {
        edit: editPet,
        remove: async (ev) => {
            ev.preventDefault();
            if (confirm('Are you sure you want to delete this pet?')){
                const reqResult = await request('deletePet', {reqIDs:{petId}});   
                if (reqResult != undefined) {
                    goTo('/home');
                }
            }
        },
        donate: (ev) => {
            ev.preventDefault();
            request('donate', {data:{petId}});
            goTo(`/details/${petId}`);
        }
    }

    render(views.viewDetails(data, funcs), main);


    function editPet(ev){
        ev.preventDefault();
        render(views.editPetView(data, onSubmit), main);
    
        async function onSubmit(ev){
            ev.preventDefault();
            try {
                const formData = new FormData(document.querySelector('form'));
                if (Array.from(formData.values()).some(el => el == '')){
                    throw new Error('All fiedls must be filled');
                }
                const petData = Object.fromEntries(formData.entries());
                const savedData = await request('editPet', {reqIDs: {petId}, data: petData}) 
                if (savedData) {
                    goTo(`/details/${petId}`);
                }
            } catch (error) {
                alert(error.message);
            }
        }
    }
}


