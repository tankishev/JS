function diagonalAttack(inputArray){
    let matrix = inputArray.map((row) => row.split(' ').map((x) => Number(x)));
    let output = [];
    let leftSum = 0;
    let rightSum = 0;
    let n = matrix.length - 1;

    for (let i = 0; i < matrix.length; i++){
        leftSum += matrix[i][i];
        rightSum += matrix[i][n - i];
    }
    if (leftSum == rightSum){
        for (let i = 0; i < matrix.length; i++){
            output.push(new Array(matrix.length).fill(leftSum));
        }
        for (let i = 0; i < matrix.length; i++){
            output[i][i] = matrix[i][i];
            output[i][n - i] = matrix[i][n - i];
        }
        matrix = output;
    }
    for (row of matrix){
        console.log(row.join(' '));
    }
}

diagonalAttack(['5 3 12 3 1',
'11 4 23 2 5',
'101 12 3 21 10',
'1 4 5 2 2',
'5 22 33 11 1']
);

diagonalAttack(['1 1 1',
'1 1 1',
'1 1 0']
);