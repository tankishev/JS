function printChessboard(size){
    size = Number(size);
    let nextIsBlack = true;
    let square = ''
    let result = '<div class="chessboard">\n';
    for (let i = 0; i < size; i++){
        result += '  <div>\n';
        for (let j = 0; j < size; j++){
            square = nextIsBlack ? 'black' : 'white';
            result += `    <span class="${square}"></span>\n`;
            nextIsBlack = !nextIsBlack;
        }
        result += '  </div>\n';
        if (size % 2 == 0) nextIsBlack = !nextIsBlack
    }
    result += '</div>'
    console.log(result)
}

printChessboard(3);
printChessboard(2);