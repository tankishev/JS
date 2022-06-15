function extractIncreasingSequence(inputArray){
    if (inputArray.length > 0){
        let currentMax = inputArray[0];
        const retval = [];
        for (n of inputArray){
            if (n >= currentMax){
                retval.push(n);
                currentMax = n;
            }
        }
        return retval;
    }
}

console.log(extractIncreasingSequence([1, 3, 8, 4, 10, 12, 3, 2, 24]));
console.log(extractIncreasingSequence([]));

