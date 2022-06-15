function cook(first, ...rest){
    const actions = {
        'chop': (x) => x / 2,
        'dice': (x) => Math.sqrt(x),
        'spice': (x) => x + 1,
        'bake': (x) => x * 3,
        'fillet': (x) => x - x * 0.2
    }
    let num = Number(first);
    for (const action of rest){
        num = actions[action](num);
        console.log(num);
    }
}

cook('32', 'chop', 'chop', 'chop', 'chop', 'chop')
cook('9', 'dice', 'spice', 'chop', 'bake', 'fillet')