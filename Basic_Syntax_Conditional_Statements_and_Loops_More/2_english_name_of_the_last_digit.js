function readLastDigit(number){
    const digitNames= ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
    let lastDigit = number % 10
    console.log(digitNames[lastDigit])
}

readLastDigit(512)
readLastDigit(1)
readLastDigit(1643)