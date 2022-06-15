function solve(num1, num2, operator){
    let result = 0;
    switch (operator){
        case "+":
            result = num1 + num2;    
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            num2 == 0 ? 0 : num1 / num2;
            break;
        case "%":
            result = num1 % num2;
            break;
        case "**":
            result = num1 ** num2;
            break;
        default:
            break;
    }
    console.log(result.toFixed(0))
}

solve(5, 6, "+")
solve(3, 5.5, "*")
