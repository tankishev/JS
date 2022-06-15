function amazingNumbers(number){
    let numArray = number.toString().split('').map(Number);
    let sum = numArray.reduce(function (a, b){return a + b}, 0);
    let result = sum.toString().includes('9') ? 'True' : 'False';
    console.log(`${number} Amazing? ${result}`);
}

amazingNumbers(1233)
amazingNumbers(999)