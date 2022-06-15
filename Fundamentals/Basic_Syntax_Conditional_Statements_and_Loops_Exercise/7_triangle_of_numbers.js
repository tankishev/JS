function triangleOfNumbers(number) {
    let strOutput = ''
    for (let i = 1; i <= number; i++){
        strOutput = `${i.toString()} `.repeat(i)
        console.log(strOutput.trim())
    }
}

triangleOfNumbers(3)
triangleOfNumbers(5)
triangleOfNumbers(6)