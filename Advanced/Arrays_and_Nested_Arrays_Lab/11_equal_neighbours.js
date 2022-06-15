function findPairs(matrix){
    let result = 0
    for (row of matrix){
        for (let i = 0; i < row.length - 1; i++){
            if (row[i] === row[i + 1]) {
                result += 1;
            }
        }
    }
    for (let i = 0; i < matrix.length - 1; i++){
        for (let j = 0; j < matrix[0].length; j++){
            if (matrix[i][j] === matrix[i + 1][j]) {
                result += 1;
            }
        }
    }
    return result;
}

res = findPairs([['test', 'yes', 'yo', 'ho'], ['well', 'done', 'yo', '6'], ['not', 'done', 'yet', '5']]);
console.log(res);