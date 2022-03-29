function mergeArrays(arrA, arrB){
    let output = [];
    for (let i = 0; i < arrA.length; i++){
        output.push(i % 2 == 0 ? Number(arrA[i]) + Number(arrB[i]) : arrA[i] + arrB[i]);
    }
    console.log(output.join(' - '))
}

mergeArrays(['5', '15', '23', '56', '35'],['17', '22', '87', '36', '11'])