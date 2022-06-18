function newCity(name, population, treasury){
    const city = {
        'name': name,
        'population': population,
        'treasury': treasury
    }
    return city;
}

console.log(newCity('Tortuga',7000,15000));
console.log(newCity('Santo Domingo',12000,23500));