function sortNumbers(inputArray){
    inputArray.sort((a, b) => a - b);
    const retval = [];
    while (inputArray.length > 0){
        retval.push(inputArray.shift());
        if (inputArray.length > 0) {
            retval.push(inputArray.pop());
        }
    }
    return retval;
}

console.log(sortNumbers([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]));