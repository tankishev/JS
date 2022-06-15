function extractNthElement(inputArr, step){
    let retval = [];
    for (n in inputArr) {
        if (n % step == 0){
            retval.push(inputArr[n]);
        }
    }
    return retval
}

console.log(extractNthElement(['5', '20', '31', '4', '20'], 2));
console.log(extractNthElement(['dsa','asd', 'test', 'tset'], 2));
console.log(extractNthElement(['1', '2','3', '4', '5'], 6));