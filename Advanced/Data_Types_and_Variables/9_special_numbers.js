function printSpecialNumbers(number) {
    function isSpecial(number){
        let sum = number.toString().split('').map(Number).reduce(function (a, b){return a + b}, 0);
        return [5, 7, 11].includes(sum) ? 'True' : 'False'
    }
    for (let n = 1; n <= number; n++){
        console.log(`${n} -> ${isSpecial(n)}`)
    }
}

printSpecialNumbers(15)