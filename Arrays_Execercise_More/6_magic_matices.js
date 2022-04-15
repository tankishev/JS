function isMagicMatrix(input){
    let isMagic = true;
    const matrixA = Array.from(input);
    let n = matrixA[0].reduce((a, b) => a + b);
    for (let i = 0; i < matrixA.length; i++){
        r = matrixA[i].reduce((a, b) => a + b);
        let c = 0;
        for (let j = 0; j < matrixA.length; j++){
            c += matrixA[j][i];
        }
        if (r != n || c != n){
            isMagic = false;
            break;
        }
    }
    console.log(isMagic)
}

isMagicMatrix([[4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]]
   )
isMagicMatrix([[11, 32, 45],
    [21, 0, 1],
    [21, 1, 1]]
    )
isMagicMatrix([[1, 0, 0],
    [0, 0, 1],
    [0, 1, 0]]
   )