function orbit(inputArray){
    let rows = inputArray[0];
    let cols = inputArray[1];
    let x = inputArray[2];
    let y = inputArray[3];
    
    let matrix = [];
    const hasFalse = (array) => array.includes(false);
    const isValidCell = (x, y) => ((0 <= x && x < rows) && (0 <= y && y < cols));

    for (let i = 0; i < rows; i++){
        matrix.push(Array(cols).fill(false));
    }
    matrix[x][y] = 1;

    let n = 1;
    while (matrix.some(hasFalse)){
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                if (matrix[i][j] == n){
                    for (let r = i - 1; r <= i + 1; r++){
                        for (let c = j - 1; c <= j + 1; c++){
                            if (isValidCell(r, c) && !matrix[r][c]){
                                matrix[r][c] = n + 1;
                            }
                        }
                    }                
                }
            }
        }
        n++;
    }

    for (el of matrix){
        console.log(el.join(' '));
    }
}

orbit([4, 4, 0, 0]);
orbit([5, 5, 2, 2]);
orbit([3, 3, 2, 2]);