function sumEvenNumbersFromArray(array){
    let filteredArray = array.filter(element => Number(element) % 2 == 0)
    filteredArray = filteredArray.map(element => Number(element))
    let result = filteredArray.reduce((a, b) => a + b, 0)
    console.log(result)
}

sumEvenNumbersFromArray(['1','2','3','4','5','6'])
sumEvenNumbersFromArray(['3','5','7','9'])