function sumOfDigits(number){
    let result = 0;
    number = number.toString()
    for(let i = 0; i < number.length; i++){
        result += Number(number[i]);
    }
    console.log(result)
}

sumOfDigits(245678);
sumOfDigits(97561);
sumOfDigits(543);
