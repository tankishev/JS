function diagonalSums(inputArray){
    let leftSum = 0;
    let rightSum = 0;
    for (let i = 0; i < inputArray.length; i++){
        leftSum += inputArray[i][i];
        rightSum += inputArray[i][inputArray.length - i - 1];
    }
    console.log(`${leftSum} ${rightSum}`)
}

diagonalSums([[20, 40], [10, 60]])