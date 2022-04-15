function spiralMatrix(rows, cols){

    rows = Number(rows);
    cols = Number(cols);
    let moveOrder = ['right', 'down', 'left', 'up'];
    let matrix = Array(rows).fill().map(() => Array(cols).fill(0));

    let move = {
        'left': x => [x[0], x[1] - 1],
        'right': x => [x[0], x[1] + 1],
        'down': x => [x[0] + 1, x[1]],
        'up': x => [x[0] - 1, x[1]],
    };

    function rotateArray(){
        moveOrder.push(moveOrder.shift());
        return moveOrder;
    };

    function isValidCell(cell){
        [i, j] = cell
        if (Math.min(i, j) >= 0 && i < rows && j < cols){
            return matrix[i][j] == 0;
        } else {
            return false;
        }
    };
    
    let current_cell = [0, -1];
    let direction = moveOrder[0];

    for (let n = 1; n <= rows * cols; n++){
        let new_cell = move[direction](current_cell);
        if (!isValidCell(new_cell)){
            direction = rotateArray()[0];
            new_cell = move[direction](current_cell);
        };
        current_cell = new_cell
        matrix[current_cell[0]][current_cell[1]] = n;
    }
    
    matrix.forEach(row => console.log(row.join(' ')))
    
}

spiralMatrix(5, 5)
spiralMatrix(3, 5)