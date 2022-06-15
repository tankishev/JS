function splitPositiveNegative(inputArray){
    let outputArray = [];
    for (n of inputArray){
        n < 0 ? outputArray.unshift(n) : outputArray.push(n);
    }
    console.log(outputArray.join('\n'))
}

splitPositiveNegative([7, -2, 8, 9]);
splitPositiveNegative([3, -2, 0, -1]);