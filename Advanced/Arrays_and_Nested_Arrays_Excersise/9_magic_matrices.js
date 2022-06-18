function isMagicArray(inputArray){
    let rowSum;
    let colSum;
    const targetSum = inputArray[0].reduce((a, b) => a + b);
    for (row = 0; row < inputArray.length; row++){
        rowSum = inputArray[row].reduce((a, b) => a + b);
        if (rowSum != targetSum){
            return false;
        }
    }
    for (let col = 0; col < inputArray[0].length; col++){
        colSum = 0;
        for (let row = 0; row < inputArray.length; row++){
            colSum += inputArray[row][col];
        }
        if (colSum != targetSum){
            return false;
        }
   }
    return true;
}

x = isMagicArray([[1, 0, 0],
    [0, 0, 1],
    [0, 1, 0]]
   
   )
console.log(x)