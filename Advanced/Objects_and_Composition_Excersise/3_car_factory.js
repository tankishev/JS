function carFactory(specs){
    const engines = [{ power: 90, volume: 1800 }, { power: 120, volume: 2400 }, { power: 200, volume: 3500 }];
    const carriages = [{ type: 'hatchback', color: specs.color }, { type: 'coupe', color: specs.color }];
    const wheels = (wheelSize) => Array(4).fill(wheelSize % 2 ? wheelSize : wheelSize - 1);

    return {
        model : specs.model,
        engine : engines.filter((el) => el.power >= specs.power)[0],
        carriage : carriages.filter((el) => el.type >= specs.carriage)[0],
        wheels : wheels(specs.wheelsize)
    };
}

console.log(carFactory({ 
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14 }));

console.log(carFactory({ 
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17 }));

const a = 5;