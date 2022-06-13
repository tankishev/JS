function getCharCase(char){
    char = String(char);
    console.log(char == char.toUpperCase() ? 'upper-case' : 'lower-case')
}

getCharCase('L')