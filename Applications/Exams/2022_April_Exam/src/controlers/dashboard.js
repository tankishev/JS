export async function loadView(ctx, next){
    const {render, views, request, main, ...rest} = ctx;
    const data = await request('getAllPets');

    render(views.dashboardView(data, onDetails), main)

    async function onDetails(ev){
        ev.preventDefault();
        const petId = ev.target.dataset.id;
        window.location.pathname = `/details/${petId}`
    }
}
