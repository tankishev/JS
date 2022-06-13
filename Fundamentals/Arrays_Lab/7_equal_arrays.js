function compareArrays(arrA, arrB){
    let arraysAreIdentical = true;
    for (let i = 0; i < arrA.length; i++){
        if (arrA[i] !== arrB[i]) {
            console.log(`Arrays are not identical. Found difference at ${i} index`);
            arraysAreIdentical = !arraysAreIdentical;
            break;
        }
    }
    if (arraysAreIdentical) {
        let sumOfElements = arrA.reduce((a, b) => Number(a) + Number(b), 0);
        console.log(`Arrays are identical. Sum: ${sumOfElements}`);
    }
}

compareArrays(['10','20','30'], ['10','20','30'])
compareArrays(['1','2','3','4','5'], ['1','2','4','4','5'])
compareArrays(['1'], ['10'])