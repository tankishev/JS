function integerAndFloat(firstNumber, secondNumber, thirdNumber){
    let result = firstNumber + secondNumber + thirdNumber
    console.log(Number.isInteger(result) ? `${result} - Integer` : `${result} - Float`)
}

integerAndFloat(9, 100, 1.1)