function getTwoSmallestNumbers(inputArray){
    let sortedArray = inputArray.sort((x, y) => x - y);
    console.log(sortedArray.slice(0, 2).join(' '))
}

getTwoSmallestNumbers([30, 15, 50, 5]);
getTwoSmallestNumbers([3, 0, 10, 4, 7, 3]);