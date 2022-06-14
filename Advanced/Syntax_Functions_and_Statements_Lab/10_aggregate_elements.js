function aggregate(inputArr){
    const startingValue = 0;
    const arrSum = inputArr.reduce(
        (x, y) => x + y
    );
    const arrInverseSum = inputArr.reduce(
        (x, y) => x +  (1 / y), startingValue
    );
    const arrConcat = inputArr.reduce(
        (x, y) => x + y, ""
    );

    console.log(arrSum);
    console.log(arrInverseSum);
    console.log(arrConcat);
}

aggregate([2, 4, 8, 16]);