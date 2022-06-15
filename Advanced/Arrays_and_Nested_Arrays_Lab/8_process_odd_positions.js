function processOddPositions(inputArray){
    let filteredArray = inputArray.filter((el, idx) => idx % 2 != 0);
    let doubleArray = filteredArray.map(element => element * 2);
    return doubleArray.reverse().join(' ');
}

x = processOddPositions([3, 0, 10, 4, 7, 3]);
console.log(x); 