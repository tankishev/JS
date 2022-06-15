function findBiggestNumber(inputArray){
    const flatArray = inputArray.flat();
    return flatArray.reduce((x, y) => Math.max(x, y));
}

result = findBiggestNumber([[20, 50, 10],[8, 33, 145]]);
console.log(result);