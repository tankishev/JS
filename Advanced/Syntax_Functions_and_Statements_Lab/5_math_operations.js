function solve(num1, num2, operator){
    let calc = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '%': (a, b) => a % b,
        '**': (a, b) => a ** b
    }
    console.log(calc[operator](num1, num2))
}

solve(5, 6, "+")
solve(3, 5.5, "*")
