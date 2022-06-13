function calculator(numA, operation, numB){
    let calc = {
        "+": (x, y) => x + y,
        "-": (x, y) => x - y,
        "*": (x, y) => x * y,
        "/": (x, y) => y != 0 ? x / y : 0
    }
    console.log(calc[operation](numA, numB).toFixed(2))
}

calculator(5, '+', 10)
calculator(25.5, '-', 3)