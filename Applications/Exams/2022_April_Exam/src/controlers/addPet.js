export function loadView(ctx, next){
    const {render, views, main, request} = ctx;
    render(views.addPetView(onSubmit), main);

    async function onSubmit(ev){
        ev.preventDefault();
        const form = document.querySelector('form');
        try {
            const formData = new FormData(form);
            if (Array.from(formData.values()).some(el => el == '')){
                throw new Error('All fiedls must be filled');
            }
            const data = Object.fromEntries(formData.entries());
            const resData = await request('createPet', {data});
            next();
        } catch (error) {
            alert(error.message);
        }
    }
}