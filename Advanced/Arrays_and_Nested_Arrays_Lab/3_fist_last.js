function sumFirstLast(strArray){
    let numArray = strArray.map(x => Number(x));
    let retval = numArray.length > 1 ? numArray[0] + numArray.pop() : numArray[0];
    return retval;
}

x = sumFirstLast(['20', '30', '40']);
console.log(x)
x = sumFirstLast(['20']);
console.log(x)

