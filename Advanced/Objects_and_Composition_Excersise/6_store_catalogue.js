function sortCatalogue(inputArr){
    const catalogue = {};
    const sortFunc = (a, b) => a.localeCompare(b);

    for (const entry of inputArr){
        let [name, price] = entry.split(' : ');
        if (catalogue[name[0]] == undefined){
            catalogue[name[0]] = [];
        }
        catalogue[name[0]].push(`  ${name}: ${price}`)
    }
    const keys = Object.keys(catalogue);
    keys.sort(sortFunc);
    for (const key of keys){
        console.log(key);
        const list = catalogue[key];
        list.sort(sortFunc);
        console.log(list.join('\n'));
    }
}

sortCatalogue([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']
);

sortCatalogue([
    'Banana : 2',
    "Rubic's Cube : 5",
    'Raspberry P : 4999',
    'Rolex : 100000',
    'Rollon : 10',
    'Rali Car : 2000000',
    'Pesho : 0.000001',
    'Barrel : 10']
);

const a = 5;