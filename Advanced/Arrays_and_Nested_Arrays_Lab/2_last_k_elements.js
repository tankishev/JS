function generateSequence(n, k){
    function sumReduce(array) {
        return array.reduce((x, y) => x + y);
    }
    
    let output = [1];
    while (output.length < n){
        output.push(sumReduce(output.slice(-k, output.length)));
    }
    return output
}

x = generateSequence(6, 3);
console.log(x);
x = generateSequence(8, 2);
console.log(x);