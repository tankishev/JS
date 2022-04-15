function nonDecreasingSubset(input){
    const numArray = Array.from(input.map(x => Number(x)));
    let n = numArray[0];
    let output = [n];
    for (let i = 1; i < numArray.length; i++) {
        if (numArray[i] < n){
            continue;
        } else {
            n = numArray[i];
            output.push(numArray[i])
        }
    }
    console.log(output.join(' '))
}

nonDecreasingSubset([ 1, 3, 8, 4, 10, 12, 3, 2, 24])
nonDecreasingSubset([1, 2, 3, 4])
nonDecreasingSubset([ 20, 3, 2, 15, 6, 1])