function playTicTacToe(moves){
    function checkForWinner(matrix){
        const board = matrix.flat();
        const winningConditions = ['XXX', 'OOO'];
        const combinations = [];
    
        combinations.push(''.concat(board[0], board[3], board[6]));
        combinations.push(''.concat(board[1], board[4], board[7]));
        combinations.push(''.concat(board[2], board[5], board[8]));
        combinations.push(''.concat(board[0], board[1], board[2]));
        combinations.push(''.concat(board[3], board[4], board[5]));
        combinations.push(''.concat(board[6], board[7], board[8]));
        combinations.push(''.concat(board[0], board[4], board[8]));
        combinations.push(''.concat(board[2], board[4], board[6]));

        for (el of combinations){
            if (winningConditions.includes(el)){
                return true;
            }
        }

        return false;
    }
    function printBoard(matrix){
        for (row of matrix){
            console.log(row.join('\t'));
        }
    }

    let player, row, col;
    let n = 0;
    const matrix = [];
    for (let i = 0; i < 3; i++){
        matrix[i] = Array(3).fill(false);
    }

    for (let i = 0; i < 9 + n; i++){
        row = Number(moves[i].split(' ')[0]);
        col = Number(moves[i].split(' ')[1]);
        player = (i + n) % 2 == 0 ? 'X' : 'O'

        if (!matrix[row][col]){
            matrix[row][col] = player;
            if (i > 3 && checkForWinner(matrix)){
                console.log(`Player ${player} wins!`)
                printBoard(matrix);
                return;
            }    
        } else {
            console.log("This place is already taken. Please choose another!")
            n++;
        }
    };
    console.log("The game ended! Nobody wins :(")
    printBoard(matrix);
}

playTicTacToe(["0 1",
"0 0",
"0 2", 
"2 0",
"1 0",
"1 1",
"1 2",
"2 2",
"2 1",
"0 0"]
);

playTicTacToe(["0 0",
"0 0",
"1 1",
"0 1",
"1 2",
"0 2",
"2 2",
"1 2",
"2 2",
"2 1"]
);

playTicTacToe(["0 1",
"0 0",
"0 2",
"2 0",
"1 0",
"1 2",
"1 1",
"2 1",
"2 2",
"0 0"]
);