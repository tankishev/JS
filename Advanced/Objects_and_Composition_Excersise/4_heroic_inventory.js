function heroRegister(inputArr){
    const retval = [];
    for (const hero of inputArr){
        let [name, heroLevel, heroItems] = hero.split(' / ');
        level = Number(heroLevel);
        items = heroItems != undefined ? heroItems.split(', ') : [];
        retval.push({name, level, items})
    }
    return JSON.stringify(retval);
}

console.log(heroRegister(['Isacc / 25 / Apple, GravityGun',
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / Desolator, Sentinel, Antara']
));
console.log(heroRegister(['Jake / 1000 / Gauss, HolidayGrenade']));