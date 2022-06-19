function getLowestPrice(inputArr){
    const retval = {}
    
    for (const entry of inputArr){
        let [town, product, price] = entry.split(' | ');
        price = Number(price);
        if (retval[product] == undefined || retval[product].price > price){
            retval[product] = {town, price};
        }
    }
    for (const key in retval){
        console.log(`${key} -> ${retval[key].price} (${retval[key].town})`);
    }
}

getLowestPrice([
    'Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10']
)