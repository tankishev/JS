export {
    loadView,
    loadNavi
}

function loadView(ctx, next){
    const {render, views, main, ...rest} = ctx;
    render(views.homeView(), main);
}

function loadNavi(ctx, next){
    const {render, nav, views, ...rest} = ctx;
    render(views.viewNavigation(), nav);
    next();
}