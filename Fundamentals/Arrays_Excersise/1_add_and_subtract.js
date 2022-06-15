function addAndSubtract(inputArray){
    let outputArray = [];
    for ([idx, num] of inputArray.entries()){
        outputArray.push(num % 2 == 0 ? num + idx : num - idx);
    }
    console.log(outputArray);
    console.log(inputArray.reduce((a, b) => a + b));
    console.log(outputArray.reduce((a, b) => a + b));
}

addAndSubtract([5, 15, 23, 56, 35]);
addAndSubtract([-5, 11, 3, 0, 2]);
