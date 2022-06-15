function biggerHalf(inputArray){
    inputArray.sort((a, b) => a - b);
    let num = Math.floor(inputArray.length / 2);
    return inputArray.slice(num);
}

console.log(biggerHalf([4, 7, 2, 5]));
console.log(biggerHalf([3, 19, 14, 7, 2, 19, 6]));