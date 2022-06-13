function maxNumber(array){
    let output = [];
    for (let i = 0; i < array.length - 1; i++){
        if (array[i] > Math.max.apply(Math, array.slice(i + 1))){
            output.push(array[i]);
        }
    }
    output.push(array[array.length - 1]);
    console.log(output.join(' '));
}

maxNumber([1, 4, 3, 2]);
maxNumber([14, 24, 3, 19, 15, 17]);
maxNumber([41, 41, 34, 20]);
maxNumber([27, 19, 42, 2, 13, 45, 48]);
