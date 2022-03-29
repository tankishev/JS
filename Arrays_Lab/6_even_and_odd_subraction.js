function sumEvenLessOdd(array){
    let tempArray = array.map(number => Number(number) % 2 == 0 ? Number(number) : -1 * Number(number));
    let result = tempArray.reduce((a, b) => a + b, 0)
    console.log(result)
}

sumEvenLessOdd([1,2,3,4,5,6])