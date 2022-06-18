function spiralMatrix(rows, cols){
    const left = ([x, y]) => [x, y + 1];
    const down = ([x, y]) => [x + 1, y];
    const right = ([x, y]) => [x, y - 1];
    const up = ([x, y]) => [x - 1, y];       
    const moves = [left, down, right, up];
    const isValid = ([x, y]) => (0 <= x && x < rows && 0 <= y && y < cols && matrix[x][y] == -1);
    const matrix = [];
    for (let i = 0; i < rows; i++){
        matrix.push(Array(cols).fill(-1));
    }
    const setCell = ([x, y], value) => matrix[x][y] = value;

    let currentCell = [0, -1];
    let newcell;
    for (let i = 1; i <= rows * cols; i++){
        newcell = moves[0](currentCell);
        while (!isValid(newcell)){
            moves.push(moves.shift());
            newcell = moves[0](currentCell);
        }
        setCell(newcell, i);
        currentCell = newcell;
    }
    for (el of matrix){
        console.log(el.join(' '));
    }

}

spiralMatrix(5, 5);
spiralMatrix(3, 3);